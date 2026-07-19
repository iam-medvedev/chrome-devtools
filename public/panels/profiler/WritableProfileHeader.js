// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { ProfileHeader } from './ProfileHeader.js';
const UIStrings = {
    /**
     * @description Name of a profile
     * @example {2} PH1
     */
    profileD: 'Profile {PH1}',
    /**
     * @description Text in Profile View of a profiler tool
     * @example {4 MB} PH1
     */
    loadingD: 'Loading… {PH1}',
    /**
     * @description Text in Profile View of a profiler tool
     * @example {example.file} PH1
     * @example {cannot open file} PH2
     */
    fileSReadErrorS: 'File \'\'{PH1}\'\' read error: {PH2}',
    /**
     * @description Text when something is loading
     */
    loading: 'Loading…',
    /**
     * @description Text in Profile View of a profiler tool
     */
    failedToReadFile: 'Failed to read file',
    /**
     * @description Text in Profile View of a profiler tool
     */
    parsing: 'Parsing…',
    /**
     * @description Status indicator in the JS Profiler to show that a file has been successfully loaded
     * from file, as opposed to a profile that has been captured locally.
     */
    loaded: 'Loaded',
};
const str_ = i18n.i18n.registerUIStrings('panels/profiler/WritableProfileHeader.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class WritableProfileHeader extends ProfileHeader {
    debuggerModel;
    fileName;
    jsonifiedProfile;
    profile;
    protocolProfileInternal;
    #profileReceivedPromise = Promise.withResolvers();
    constructor(debuggerModel, type, title) {
        super(type, title || i18nString(UIStrings.profileD, { PH1: type.nextProfileUid() }));
        this.debuggerModel = debuggerModel;
    }
    onChunkTransferred(_reader) {
        if (this.jsonifiedProfile) {
            this.updateStatus(i18nString(UIStrings.loadingD, { PH1: i18n.ByteUtilities.bytesToString(this.jsonifiedProfile.length) }));
        }
    }
    onError(reader) {
        const error = reader.error();
        if (error) {
            this.updateStatus(i18nString(UIStrings.fileSReadErrorS, { PH1: reader.fileName(), PH2: error.message }));
        }
    }
    async write(text) {
        this.jsonifiedProfile += text;
    }
    async close() {
    }
    dispose() {
        this.removeTempFile();
    }
    canSaveToFile() {
        return !this.fromFile();
    }
    async saveToFile() {
        await this.#profileReceivedPromise.promise;
        const fileOutputStream = new Bindings.FileUtils.FileOutputStream(Workspace.FileManager.FileManager.instance());
        if (!this.fileName) {
            const now = Platform.DateUtilities.toISO8601Compact(new Date());
            const fileExtension = this.profileType().fileExtension();
            this.fileName = `${this.profileType().typeName()}-${now}${fileExtension}`;
        }
        const accepted = await fileOutputStream.open(this.fileName);
        if (!accepted || !this.tempFile) {
            return;
        }
        const data = await this.tempFile.read();
        if (data) {
            await fileOutputStream.write(data);
        }
        void fileOutputStream.close();
    }
    async loadFromFile(file) {
        this.updateStatus(i18nString(UIStrings.loading), true);
        const fileReader = new Bindings.FileUtils.ChunkedFileReader(file, 10000000, this.onChunkTransferred.bind(this));
        this.jsonifiedProfile = '';
        const success = await fileReader.read(this);
        if (!success) {
            this.onError(fileReader);
            return new Error(i18nString(UIStrings.failedToReadFile));
        }
        this.updateStatus(i18nString(UIStrings.parsing), true);
        let error = null;
        try {
            this.profile = JSON.parse(this.jsonifiedProfile);
            this.setProfile((this.profile));
            this.updateStatus(i18nString(UIStrings.loaded), false);
        }
        catch (e) {
            error = e;
            this.profileType().removeProfile(this);
        }
        this.jsonifiedProfile = null;
        if (this.profileType().profileBeingRecorded() === this) {
            this.profileType().setProfileBeingRecorded(null);
        }
        return error;
    }
    setProtocolProfile(profile) {
        this.setProfile(profile);
        this.protocolProfileInternal = profile;
        this.tempFile = new Bindings.TempFile.TempFile(Common.Console.Console.instance());
        this.tempFile.write([JSON.stringify(profile)]);
        this.#profileReceivedPromise.resolve();
    }
}
//# sourceMappingURL=WritableProfileHeader.js.map