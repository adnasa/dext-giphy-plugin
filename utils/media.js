module.exports = function media (
  { id, slug, images: { fixed_height_small_still: img } }
) {
  return {
    titie: id,
    subtitle: slug,
    arg: img.url,
    icon: { path: img.url },
  }
}
