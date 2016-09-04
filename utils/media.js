module.exports = function media ({
  id, slug,
  images: {
    fixed_height_small_still: smallImg,
    original,
  },
}) {
  return {
    titie: id,
    subtitle: slug,
    arg: original.url,
    icon: { path: smallImg.url },
  }
}
