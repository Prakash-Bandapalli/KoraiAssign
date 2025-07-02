const parseTextDynamically = (text) => {
  const lines = text.split("\n");
  const results = [];
  const headerKeywords = ["test", "name", "units", "values", "range", "result"];

  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    if (lowerLine.length === 0) continue;

    // --- Skip obvious headers ---
    const headerWordCount = headerKeywords.filter((kw) =>
      lowerLine.includes(kw)
    ).length;
    if (headerWordCount >= 2) {
      continue;
    }

    const extractedData = extractDynamicDataFromLine(line);

    if (extractedData.value && (extractedData.unit || extractedData.range)) {
      if (extractedData.parameter.length > 2) {
        results.push(extractedData);
      }
    }
  }

  return results;
};

const extractDynamicDataFromLine = (line) => {
  // Regex to find a value, which might have H/L at the end (e.g., 134L, 151H)
  const valueMatch = line.match(/(\b\d+(\.\d+)?[HL]?\b)/);
  if (!valueMatch) {
    return { parameter: null, value: null, unit: null, range: null };
  }

  const rawValue = valueMatch[0];
  const valueIndex = valueMatch.index;

  // Extract the parameter name: everything on the line before the value
  let parameter = line.substring(0, valueIndex).trim();

  // Clean up common OCR junk from the parameter name
  parameter = parameter.replace(/[.:-]$/, "").trim();

  // The rest of the line, after the value, contains units and range
  const restOfLine = line.substring(valueIndex + rawValue.length);

  // Regex to find units and ranges in the remaining part of the line
  const unitRegex = /(mg\/dl|mmol\/l|u\/l|g\/dl|mosm\/kg|%)/i;
  const rangeRegex =
    /(\d{1,4}(\.\d+)?\s*-\s*\d{1,4}(\.\d+)?)|([<>]\s*\d{1,4}(\.\d+)?)/;

  const unitMatch = restOfLine.match(unitRegex);
  const rangeMatch = restOfLine.match(rangeRegex);

  return {
    parameter: parameter,
    value: rawValue,
    unit: unitMatch ? unitMatch[0] : null,
    range: rangeMatch ? rangeMatch[0] : null,
  };
};

module.exports = {
  parseText: parseTextDynamically,
};
