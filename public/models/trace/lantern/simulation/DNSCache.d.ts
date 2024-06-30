import type * as Lantern from '../types/types.js';
declare class DNSCache {
    static rttMultiplier: number;
    _rtt: number;
    _resolvedDomainNames: Map<string, {
        resolvedAt: number;
    }>;
    constructor({ rtt }: {
        rtt: number;
    });
    getTimeUntilResolution(request: Lantern.NetworkRequest, options?: {
        requestedAt: number;
        shouldUpdateCache: boolean;
    }): number;
    _updateCacheResolvedAtIfNeeded(request: Lantern.NetworkRequest, resolvedAt: number): void;
    /**
     * Forcefully sets the DNS resolution time for a request.
     * Useful for testing and alternate execution simulations.
     */
    setResolvedAt(domain: string, resolvedAt: number): void;
}
export { DNSCache };
