
const isDiscounted = true;

const discountMultiplier = isDiscounted ? 0.8 : 1;
const applyDiscount = (price) => Math.round(price * discountMultiplier);

const baseAcademicPricing = [
    { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 },
    { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 },
    { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 },
    { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
];

const academicPricing = baseAcademicPricing.map(item => ({
    ...item,
    early: applyDiscount(item.early),
    standard: applyDiscount(item.standard),
    onspot: applyDiscount(item.onspot),
    original: item
}));

console.log("Discount Multiplier:", discountMultiplier);
console.log("Academic Pricing (Speaker):");
console.log("Original Early:", academicPricing[0].original.early);
console.log("Discounted Early:", academicPricing[0].early);
console.log("Is Original Early == Base Early?", academicPricing[0].original.early === 749);
console.log("Is Discounted Early < Base Early?", academicPricing[0].early < 749);
