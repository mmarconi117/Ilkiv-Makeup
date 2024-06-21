function car(e) {
    let totalRepeatedCount = 0;

    e.forEach(str => {
        let charCount = {};

        console.log(`Processing string: ${str}`);

        // Count occurrences of each character in the string
        for (let char of str) {
            if (charCount[char]) {
                charCount[char]++;
            } else {
                charCount[char] = 1;
            }
            console.log(`Character: ${char}, Count so far: ${charCount[char]}`);
        }

        console.log(`Character counts for string "${str}":`, charCount);

        // Count characters that appear more than once
        for (let key in charCount) {
            if (charCount[key] > 1) {
                console.log(`Character "${key}" is repeated ${charCount[key]} times.`);
                totalRepeatedCount += charCount[key];
            }
        }

        console.log(`Total repeated characters so far: ${totalRepeatedCount}`);
    });

    return totalRepeatedCount;
}

// Example usage with console.log()
console.log(`Total repeated characters: ${car(["camaro", "mustang", "challenger"])}`);
