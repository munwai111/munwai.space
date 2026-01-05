/**
 * Auto-generate timeline data from folder structure using Vite's import.meta.glob
 *
 * Expected folder structure:
 * src/assets/Timeline_Photos/
 *   1_Category_Name/
 *     Picture_1.jpg (main)
 *     Picture_2.jpg
 *     ...
 *   2_Another_Category/
 *     ...
 */

// Import all images from Timeline_Photos subfolders
const imageModules = import.meta.glob(
  "/src/assets/Timeline_Photos/**/*.{png,jpg,jpeg,webp,gif,JPG,PNG,JPEG}",
  { eager: true, import: "default" }
);

/**
 * Parse folder name to extract order and label
 * e.g., "1_WSC_Photos" -> { order: 1, label: "WSC Photos" }
 */
const parseFolderName = (folderName) => {
  // Match pattern: number followed by underscore, then the rest
  const match = folderName.match(/^(\d+)_(.+)$/);
  if (match) {
    const order = parseInt(match[1], 10);
    // Convert underscores to spaces and format nicely
    const label = match[2].replace(/_/g, " ");
    return { order, label };
  }
  return { order: 999, label: folderName };
};

/**
 * Parse image filename to extract index
 * e.g., "Picture_1.jpg" -> { index: 1, isMain: true }
 * For non-standard names, assign index based on alphabetical order
 */
const parseImageName = (filename) => {
  const match = filename.match(/Picture_(\d+)\./i);
  if (match) {
    const index = parseInt(match[1], 10);
    return { index, isMain: index === 1 };
  }
  // For non-standard names, we'll handle sorting later
  return { index: 999, isMain: false };
};

/**
 * Process all imported images into structured timeline data
 * @returns {TimelineCategory[]}
 */
export const generateTimelineData = () => {
  const categories = new Map();

  Object.entries(imageModules).forEach(([path, src]) => {
    // Extract folder name and filename from path
    // Path format: /src/assets/Timeline_Photos/1_Category_Name/Picture_1.jpg
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const folderName = parts[parts.length - 2];

    // Skip if not in a subfolder
    if (!folderName || folderName === "Timeline_Photos") return;

    // Skip video files that might slip through
    if (/\.(mp4|webm|mov|avi)$/i.test(filename)) return;

    const { order, label } = parseFolderName(folderName);
    const { index, isMain } = parseImageName(filename);

    // Create or update category
    if (!categories.has(folderName)) {
      categories.set(folderName, {
        order,
        key: folderName,
        label,
        images: [],
      });
    }

    categories.get(folderName).images.push({
      index,
      src,
      isMain,
      filename,
    });
  });

  // Sort and process each category
  const result = Array.from(categories.values())
    .sort((a, b) => a.order - b.order)
    .map((category) => {
      // Sort images by index
      category.images.sort((a, b) => a.index - b.index);

      // If no Picture_1 found, make the first image the main one
      const hasMain = category.images.some((img) => img.isMain);
      if (!hasMain && category.images.length > 0) {
        category.images[0].isMain = true;
      }

      // Limit to reasonable number of images per cluster (max 8)
      category.images = category.images.slice(0, 8);

      return category;
    });

  return result;
};

// Export pre-generated data for immediate use
export const timelineData = generateTimelineData();

export default timelineData;
