const speakerImages = [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
];

const firstNames = [
    "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth",
    "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
    "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
    "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah",
    "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia",
    "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen",
    "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma",
    "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Frank", "Debra", "Alexander", "Rachel",
    "Raymond", "Catherine", "Patrick", "Carolyn", "Jack", "Janet", "Dennis", "Ruth", "Jerry", "Maria",
    "Tyler", "Heather", "Aaron", "Diane", "Jose", "Virginia", "Adam", "Julie", "Henry", "Joyce",
    "Nathan", "Victoria", "Douglas", "Olivia", "Zachary", "Kelly", "Peter", "Christina", "Kyle", "Lauren"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
];

const titles = [
    "Professor of Food Science", "Senior Agricultural Scientist", "Director of Sustainable Farming", "Head of Food Technology",
    "Associate Professor of Agronomy", "Food Safety Director", "Chief Innovation Officer", "Soil Science Research Fellow", "Agricultural Engineer",
    "PhD Candidate in Biotechnology", "Sustainable Food Systems Advisor", "Laboratory Director", "Principal Investigator", "Senior Lecturer in Horticulture",
    "Consultant Food Technologist", "Precision Farming Expert", "Plant Geneticist", "Food Microbiologist", "Animal Nutrition Specialist", "Aquaculture Researcher"
];

const affiliations = [
    "Wageningen University & Research", "UC Davis College of Agricultural and Environmental Sciences", "Cornell College of Agriculture and Life Sciences", "University of Reading",
    "ETH Zurich - Department of Environmental Systems Science", "Nanjing Agricultural University", "The University of Tokyo - Faculty of Agriculture", "University of Queensland",
    "International Food Policy Research Institute", "Food and Agriculture Organization (FAO)", "CGIAR Consortium", "National Institute of Food and Agriculture",
    "INRAE France", "University of Copenhagen", "Swedish University of Agricultural Sciences", "Texas A&M AgriLife", "Singapore Institute of Food and Biotechnology Innovation",
    "Kyoto University - Graduate School of Agriculture", "University of Illinois at Urbana-Champaign", "Massey University"
];

const categories = ["Keynote Speakers", "Plenary Speakers", "Poster Presenter", "Student", "Delegate", "Committee"];

const seedRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const generateSpeakers = () => {
    const speakers = [];
    let id = 1;

    categories.forEach((cat, catIndex) => {
        for (let i = 0; i < 20; i++) {
            // Deterministic random generation based on ID to keep data consistent across renders if generated on fly
            // (Though here it runs once at module load)
            const seed = id * 13579 + catIndex * 2468;

            const firstNameIndex = Math.floor(seedRandom(seed) * firstNames.length);
            const lastNameIndex = Math.floor(seedRandom(seed + 1) * lastNames.length);
            const titleIndex = Math.floor(seedRandom(seed + 2) * titles.length);
            const affIndex = Math.floor(seedRandom(seed + 3) * affiliations.length);
            const imgIndex = Math.floor(seedRandom(seed + 4) * speakerImages.length);

            // Gender-based image approximation (very rough, just for demo to match names if we cared, 
            // but for now random image is fine as user asked for names)
            // Let's just use random image from the list

            speakers.push({
                id: id++,
                category: cat,
                name: `Dr. ${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`,
                title: titles[titleIndex],
                affiliation: affiliations[affIndex],
                image: speakerImages[imgIndex]
            });
        }
    });
    return speakers;
};

export const speakers = generateSpeakers();
