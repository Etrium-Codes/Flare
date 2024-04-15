
const time = {
    calculateDiff(creationDateString) {
        const creationDate = new Date(creationDateString);
        const now = new Date();
        const diffTime = Math.abs(now - creationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
        if (diffDays < 1) {
            return "today";
        } else if (diffDays < 2) {
            return "yesterday";
        } else if (diffDays < 30) {
            return `${diffDays} days ago`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return months === 1 ? "1 month ago" : `${months} months ago`;
        } else {
            const years = Math.floor(diffDays / 365);
            return years === 1 ? "1 year ago" : `${years} years ago`;
        }
    }
}

module.exports = time;
