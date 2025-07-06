import '../../ui/legacy/legacy.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
interface Authenticator {
    name: string;
    options: Protocol.WebAuthn.VirtualAuthenticatorOptions;
    credentials: Protocol.WebAuthn.Credential[];
}
interface Authenticator {
    name: string;
    options: Protocol.WebAuthn.VirtualAuthenticatorOptions;
    credentials: Protocol.WebAuthn.Credential[];
}
interface ViewInput {
    enabled: boolean;
    onToggleEnabled: () => void;
    authenticators: Map<Protocol.WebAuthn.AuthenticatorId, Authenticator>;
    activeAuthenticatorId: Protocol.WebAuthn.AuthenticatorId | null;
    editingAuthenticatorId: Protocol.WebAuthn.AuthenticatorId | null;
    newAuthenticatorOptions: Protocol.WebAuthn.VirtualAuthenticatorOptions;
    internalTransportAvailable: boolean;
    updateNewAuthenticatorOptions: (change: Partial<Protocol.WebAuthn.VirtualAuthenticatorOptions>) => void;
    addAuthenticator: () => void;
    onActivateAuthenticator: (id: Protocol.WebAuthn.AuthenticatorId) => void;
    onEditName: (id: Protocol.WebAuthn.AuthenticatorId) => void;
    onSaveName: (id: Protocol.WebAuthn.AuthenticatorId, name: string) => void;
    onRemoveAuthenticator: (id: Protocol.WebAuthn.AuthenticatorId) => void;
    onExportCredential: (credential: Protocol.WebAuthn.Credential) => void;
    onRemoveCredential: (id: Protocol.WebAuthn.AuthenticatorId, credentialId: string) => void;
}
interface ViewOutput {
    revealSection: Map<string, () => void>;
}
type ViewFunction = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: ViewFunction;
export declare class WebauthnPaneImpl extends UI.Panel.Panel implements SDK.TargetManager.SDKModelObserver<SDK.WebAuthnModel.WebAuthnModel> {
    #private;
    constructor(view?: ViewFunction);
    performUpdate(): void;
    modelAdded(model: SDK.WebAuthnModel.WebAuthnModel): void;
    modelRemoved(model: SDK.WebAuthnModel.WebAuthnModel): void;
    ownerViewDisposed(): Promise<void>;
    /**
     * Removes both the authenticator and its respective UI element.
     */
    removeAuthenticator(authenticatorId: Protocol.WebAuthn.AuthenticatorId): void;
}
export {};
