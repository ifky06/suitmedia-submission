const SanityClient = require("@/utils/SanityClient");
const imageUrlBuilder = require('@sanity/image-url');
// const ImageUrlBuilder = require("@sanity/image-url/lib/types/builder");

class SanityImage {
    static imageUrlBuilder;

    static getUrlBuilder(url) {
        if (!SanityImage.imageUrlBuilder) {
            SanityImage.imageUrlBuilder = imageUrlBuilder(SanityClient.getClient());
        }
        return SanityImage.imageUrlBuilder.image(url);
    }
}

module.exports = SanityImage;
