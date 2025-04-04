// Placeholder image data to avoid network errors

// Generate placeholder URLs that can be used locally
const generateLocalPlaceholder = (width, height, text, bgColor = '#f3f4f6', textColor = '#4b5563') => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${bgColor.replace('#', '%23')}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='${textColor.replace('#', '%23')}' text-anchor='middle' dominant-baseline='middle'%3E${text}%3C/text%3E%3C/svg%3E`;
};

// Create placeholders for different sections
export const placeholders = {
  chooseTemplate: generateLocalPlaceholder(400, 300, 'Choose Template', '#e0e7ff', '#4f46e5'),
  addContent: generateLocalPlaceholder(400, 300, 'Add Content', '#e0e7ff', '#4f46e5'),
  customizeDesign: generateLocalPlaceholder(400, 300, 'Customize Design', '#e0e7ff', '#4f46e5'),
  downloadShare: generateLocalPlaceholder(400, 300, 'Download & Share', '#e0e7ff', '#4f46e5'),
};

export default placeholders;
