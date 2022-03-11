export const useWorkImageUrl = function () {
  function getWorkImageUrl(work) {
    return (
      work.images.recommended_url ||
      work.images.facebook.og_image_url ||
      work.images.twitter.image_url
    );
  }

  return { getWorkImageUrl };
};
