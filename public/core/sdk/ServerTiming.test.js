// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import * as SDK from './sdk.js';
describe('ServerTiming', () => {
    it('can be instantiated correctly', () => {
        const serverTiming = new SDK.ServerTiming.ServerTiming('example metric', 1, 'example description');
        assert.strictEqual(serverTiming.metric, 'example metric', 'metric was not set correctly');
        assert.strictEqual(serverTiming.value, 1, 'value was not set correctly');
        assert.strictEqual(serverTiming.description, 'example description', 'description was not set correctly');
    });
});
describeWithLocale('SDK.ServerTiming.ServerTiming.createFromHeaderValue', () => {
    it('parses headers correctly', () => {
        // A real-world-like example with some edge cases.
        const actual = SDK.ServerTiming.ServerTiming.createFromHeaderValue('lb; desc = "Load bala\\ncer" ; dur= 42,sql-1 ;desc="MySQL lookup server";dur=100,sql-2;dur ="900.1";desc="MySQL shard server #1",fs;\tdur=600;desc="FileSystem",\tcache;dur=300;desc="",other;dur=200;desc="Database write",other;dur=110;desc="Database read",cpu;dur=1230;desc="Total CPU"');
        const expected = [
            {
                name: 'lb',
                desc: 'Load balancer',
                dur: 42,
            },
            {
                name: 'sql-1',
                desc: 'MySQL lookup server',
                dur: 100,
            },
            {
                name: 'sql-2',
                dur: 900.1,
                desc: 'MySQL shard server #1',
            },
            {
                name: 'fs',
                dur: 600,
                desc: 'FileSystem',
            },
            {
                name: 'cache',
                dur: 300,
                desc: '',
            },
            {
                name: 'other',
                dur: 200,
                desc: 'Database write',
            },
            {
                name: 'other',
                dur: 110,
                desc: 'Database read',
            },
            {
                name: 'cpu',
                dur: 1230,
                desc: 'Total CPU',
            },
        ];
        assert.deepEqual(actual, expected);
    });
    it('parses the custom non-standard cfL4 headers correctly', () => {
        const actual = SDK.ServerTiming.ServerTiming.createFromHeaderValue('cfL4;desc="?proto=TCP&rtt=6699&sent=35&recv=35&lost=0&retrans=0&sent_bytes=29507&recv_bytes=3329&delivery_rate=2064884&cwnd=228&unsent_bytes=0&cid=2c16ce0a54b8174d&ts=215&x=0"');
        const expected = [
            {
                name: 'cfL4',
                desc: '?proto=TCP&rtt=6699&sent=35&recv=35&lost=0&retrans=0&sent_bytes=29507&recv_bytes=3329&delivery_rate=2064884&cwnd=228&unsent_bytes=0&cid=2c16ce0a54b8174d&ts=215&x=0',
            },
            { name: '(cf) proto', desc: 'TCP' },
            { name: '(cf) rtt', desc: '6699' },
            { name: '(cf) sent', desc: '35' },
            { name: '(cf) recv', desc: '35' },
            { name: '(cf) lost', desc: '0' },
            { name: '(cf) retrans', desc: '0' },
            { name: '(cf) sent_bytes', desc: '29507' },
            { name: '(cf) recv_bytes', desc: '3329' },
            { name: '(cf) delivery_rate', desc: '2064884' },
            { name: '(cf) cwnd', desc: '228' },
            { name: '(cf) unsent_bytes', desc: '0' },
            { name: '(cf) cid', desc: '2c16ce0a54b8174d' },
            { name: '(cf) ts', desc: '215' },
            { name: '(cf) x', desc: '0' },
        ];
        assert.deepEqual(actual, expected);
    });
    it('parses the custom non-standard cloudinary headers correctly', () => {
        const actual = SDK.ServerTiming.ServerTiming.createFromHeaderValue('cld-fastly;dur=2;cpu=0;start=2025-03-31T21:29:17.654Z;desc=hit,rtt;dur=13,content-info;desc="width=1440,height=328,bytes=6066,format=\\"svg\\",o=1,crt=1736894672,ef=(17)"');
        const expected = [
            { name: 'cld-fastly', dur: 2, desc: 'hit' },
            { name: 'rtt', dur: 13 },
            { name: 'content-info', desc: 'width=1440,height=328,bytes=6066,format=\"svg\",o=1,crt=1736894672,ef=(17)' },
            { name: '(cld) width', desc: '1440' },
            { name: '(cld) height', desc: '328' },
            { name: '(cld) bytes', desc: '6066' },
            { name: '(cld) format', desc: '"svg"' },
            { name: '(cld) o', desc: '1' },
            { name: '(cld) crt', desc: '1736894672' },
            { name: '(cld) ef', desc: '(17)' },
        ];
        assert.deepEqual(actual, expected);
    });
    it('parses Server Timing metric names correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric'), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('aB3!#$%&\'*+-.^_`|~'), [{ name: 'aB3!#$%&\'*+-.^_`|~' }]);
    });
    it('parses Server Timing metric durations correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur=123.4'), [{ name: 'metric', dur: 123.4 }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur="123.4"'), [{ name: 'metric', dur: 123.4 }]);
    });
    it('parses Server Timing metric descriptions correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=description'), [
            { name: 'metric', desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="description"'), [
            { name: 'metric', desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur=123.4;desc=description'), [
            { name: 'metric', dur: 123.4, desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=description;dur=123.4'), [
            { name: 'metric', desc: 'description', dur: 123.4 },
        ]);
    });
    it('handles spaces in Server Timing headers correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric ; '), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric , '), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric ; dur = 123.4 ; desc = description'), [
            { name: 'metric', dur: 123.4, desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric ; desc = description ; dur = 123.4'), [
            { name: 'metric', desc: 'description', dur: 123.4 },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc = "description"'), [
            { name: 'metric', desc: 'description' },
        ]);
    });
    it('handles tabs in Server Timing headers correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric\t;\t'), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric\t,\t'), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric\t;\tdur\t=\t123.4\t;\tdesc\t=\tdescription'), [
            { name: 'metric', dur: 123.4, desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric\t;\tdesc\t=\tdescription\t;\tdur\t=\t123.4'), [
            { name: 'metric', desc: 'description', dur: 123.4 },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc\t=\t"description"'), [
            { name: 'metric', desc: 'description' },
        ]);
    });
    it('handles Server Timing headers with multiple entries correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric1;dur=12.3;desc=description1,metric2;dur=45.6;desc=description2,metric3;dur=78.9;desc=description3'), [
            { name: 'metric1', dur: 12.3, desc: 'description1' },
            { name: 'metric2', dur: 45.6, desc: 'description2' },
            { name: 'metric3', dur: 78.9, desc: 'description3' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric1,metric2 ,metric3, metric4 , metric5'), [
            { name: 'metric1' },
            { name: 'metric2' },
            { name: 'metric3' },
            { name: 'metric4' },
            { name: 'metric5' },
        ]);
    });
    it('handles RFC7230 quoted-string Server Timing values correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="description"'), [
            { name: 'metric', desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\t description \t"'), [
            { name: 'metric', desc: '\t description \t' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="descr\\"iption"'), [
            { name: 'metric', desc: 'descr"iption' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=""'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\"\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\""'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=""\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="""'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\"\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\\\""'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\"\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\"\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\""\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=\\"""'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\\\"'), [{ name: 'metric', desc: '\\' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\"\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="\\""'), [{ name: 'metric', desc: '"' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=""\\\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=""\\"'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="""\\'), [{ name: 'metric', desc: '' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=""""'), [{ name: 'metric', desc: '' }]);
    });
    it('handles case-sensitivity correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;DuR=123.4;DeSc=description'), [
            { name: 'metric', dur: 123.4, desc: 'description' },
        ]);
    });
    it('handles duplicate entry names correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur=12.3;desc=description1,metric;dur=45.6;desc=description2'), [
            { name: 'metric', dur: 12.3, desc: 'description1' },
            { name: 'metric', dur: 45.6, desc: 'description2' },
        ]);
    });
    it('handles non-numeric durations correctly', () => {
        // Non-numeric durations.
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur=foo'), [{ name: 'metric', dur: 0 }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur="foo"'), [{ name: 'metric', dur: 0 }]);
    });
    it('handles incomplete parameters correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur;dur=123.4;desc=description'), [
            { name: 'metric', dur: 0, desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur=;dur=123.4;desc=description'), [
            { name: 'metric', dur: 0, desc: 'description' },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc;desc=description;dur=123.4'), [
            { name: 'metric', desc: '', dur: 123.4 },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=;desc=description;dur=123.4'), [
            { name: 'metric', desc: '', dur: 123.4 },
        ]);
    });
    it('handles extraneous characters after parameter values correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc=d1 d2;dur=123.4'), [
            { name: 'metric', desc: 'd1', dur: 123.4 },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric1;desc=d1 d2,metric2'), [
            { name: 'metric1', desc: 'd1' },
            { name: 'metric2' },
        ]);
    });
    it('handles extraneous characters after RFC7230 quoted-string parameter values correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;desc="d1" d2;dur=123.4'), [
            { name: 'metric', desc: 'd1', dur: 123.4 },
        ]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric1;desc="d1" d2,metric2'), [
            { name: 'metric1', desc: 'd1' },
            { name: 'metric2' },
        ]);
    });
    it('handles extraneous characters after entry name token correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric==   ""foo;dur=123.4'), [{ name: 'metric' }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric1==   ""foo,metric2'), [{ name: 'metric1' }]);
    });
    it('handles extraneous characters after parameter name token correctly', () => {
        // Note: also see the tests below that checks for warnings.
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;dur foo=12'), [{ name: 'metric', dur: 0 }]);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('metric;foo dur=12'), [{ name: 'metric' }]);
    });
    it('handles bad input resulting in zero entries correctly', () => {
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(' '), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('='), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(';'), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(','), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('=;'), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(';='), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue('=,'), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(',='), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(';,'), []);
        assert.deepEqual(SDK.ServerTiming.ServerTiming.createFromHeaderValue(',;'), []);
    });
    it('triggers warnings when needed', () => {
        // TODO: These tests require mocking `Common.console.warn`.
        // For now, we override `SDK.ServerTiming.ServerTiming.showWarning` to throw an
        // exception instead of logging it.
        SDK.ServerTiming.ServerTiming.showWarning = message => {
            throw new Error(message);
        };
        assert.throws(() => {
            SDK.ServerTiming.ServerTiming.createFromHeaderValue('lb=42; "Load balancer"');
        }, /Deprecated syntax found/, 'legacy header syntax should trigger a warning');
        assert.throws(() => {
            SDK.ServerTiming.ServerTiming.createFromHeaderValue('sql;desc="MySQL";dur=100;dur=200');
        }, /Duplicate parameter/, 'duplicate parameters should trigger a warning');
        assert.throws(() => {
            SDK.ServerTiming.ServerTiming.createFromHeaderValue('sql;desc;dur=100');
        }, /No value found for parameter/, 'parameters without a value should trigger a warning');
        assert.throws(() => {
            SDK.ServerTiming.ServerTiming.createFromHeaderValue('sql;desc="MySQL";dur=abc');
        }, /Unable to parse/, 'duration values that cannot be converted to floats should trigger a warning');
        assert.throws(() => {
            SDK.ServerTiming.ServerTiming.createFromHeaderValue('sql;desc="MySQL";dur=100;invalid=lol');
        }, /Unrecognized parameter/, 'invalid parameters should trigger a warning');
    });
});
//# sourceMappingURL=ServerTiming.test.js.map