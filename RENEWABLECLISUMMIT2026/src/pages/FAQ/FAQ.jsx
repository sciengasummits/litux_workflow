import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const faqs = [
        {
            category: "Registration",
            items: [
                {
                    question: "How can I register for the International Conference On RENEWABLE ENERGY & CLIMATE CHANGE?",
                    answer: "You can register online through our website by visiting the 'Register' page. Early bird registration is available until the specified deadline."
                },
                {
                    question: "Is there a discount for group registrations?",
                    answer: "Yes, we offer group discounts for groups larger than 5 attendees. Please contact our support team at contact@foodagrisummit.com for more details."
                },
                {
                    question: "What is included in the registration fee?",
                    answer: "The registration fee covers access to all scientific sessions, the exhibition area, conference materials, coffee breaks, and lunch."
                },
                {
                    question: "Can I cancel my registration?",
                    answer: "Cancellations are subject to our refund policy. Please refer to the Terms & Conditions page for detailed information regarding deadlines and refund percentages."
                }
            ]
        },
        {
            category: "Scientific Program",
            items: [
                {
                    question: "How can I submit an abstract?",
                    answer: "Abstracts can be submitted via the 'Abstract Submission' page. Please follow the guidelines provided for formatting and submission deadlines."
                },
                {
                    question: "When will I be notified about my abstract acceptance?",
                    answer: "Notifications of acceptance will be sent via email within 2-3 weeks after the submission deadline."
                },
                {
                    question: "Can I present more than one abstract?",
                    answer: "Yes, you can submit multiple abstracts. However, please ensure that each abstract presents distinct research findings."
                },
                {
                    question: "What form of presentation is available?",
                    answer: "Presentations can be in the form of oral presentations or poster displays. You can select your preference during submission, but the final decision rests with the Scientific Committee."
                }
            ]
        },
        {
            category: "Venue & Accommodation",
            items: [
                {
                    question: "Where is the congress taking place?",
                    answer: "The congress will be held at Marina Bay Sands, Singapore. Detailed venue information and maps are available on the 'Venue' page."
                },
                {
                    question: "Are there recommended hotels nearby?",
                    answer: "Yes, we have partnered with several hotels near the venue to offer discounted rates for attendees. Please check the 'Venue' page for a list of recommended accommodations."
                },
                {
                    question: "Is there parking available at the venue?",
                    answer: "Yes, the venue offers ample parking space for attendees. Valet services are also available upon request."
                }
            ]
        },
        {
            category: "Visa & Travel",
            items: [
                {
                    question: "Do I need a visa to attend the conference?",
                    answer: "Visa requirements depend on your country of citizenship. Please check with your local embassy or consulate. We can provide an invitation letter to support your visa application upon successful registration."
                },
                {
                    question: "How do I request an invitation letter?",
                    answer: "Invitation letters can be requested via email after your registration is confirmed. Please send your request along with your registration ID to our support team."
                }
            ]
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    // Filter FAQs based on search
    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.question.toLowerCase().includes(searchTerm) ||
            item.answer.toLowerCase().includes(searchTerm)
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="faq-page">
            <header className="page-header">
                <div className="container text-center">
                    <h1 className="page-title">Frequently Asked Questions</h1>
                    <div className="page-breadcrumb">Home / FAQs</div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="faq-search-wrapper">
                        <div className="faq-search-box">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search for questions (e.g., Registration, Abstract, Venue...)"
                                className="faq-search-input"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="faq-content">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((category, catIndex) => (
                                <div key={catIndex} className="faq-category">
                                    <h2 className="category-title">{category.category}</h2>
                                    <div className="faq-list">
                                        {category.items.map((item, index) => {
                                            const itemIndex = `${catIndex}-${index}`;
                                            const isActive = activeIndex === itemIndex;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`faq-item ${isActive ? 'active' : ''}`}
                                                    onClick={() => toggleAccordion(itemIndex)}
                                                >
                                                    <div className="faq-question">
                                                        <h3>{item.question}</h3>
                                                        <span className="faq-toggle-icon">
                                                            {isActive ? <Minus size={20} /> : <Plus size={20} />}
                                                        </span>
                                                    </div>
                                                    <div className={`faq-answer ${isActive ? 'open' : ''}`}>
                                                        <div className="faq-answer-inner">
                                                            <p>{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results text-center">
                                <h3>No results found for "{searchTerm}"</h3>
                                <p>Please try a different keyword or contact us directly.</p>
                            </div>
                        )}
                    </div>

                    <div className="faq-cta-box">
                        <div className="cta-content">
                            <h3>Still have questions?</h3>
                            <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
                            <Link to="/contact">
                                <Button variant="primary">Contact Support</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
