var provider = null;

export const placeProvider = {
  injectProvider(nProvider) {
    provider = nProvider;
  },
  get provider() {
    return provider;
  },
  nearbySearch(arg, cb) {
    return provider && provider.nearbySearch(arg, cb);
  },
}
