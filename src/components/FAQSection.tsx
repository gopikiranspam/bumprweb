import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
}

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!supabase) {
        throw new Error('Database not configured');
      }

      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;

      setFaqs(data || []);
    } catch (err: any) {
      console.error('Error loading FAQs:', err);
      setError('Failed to load FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Pagination logic
  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFAQs = faqs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to FAQ section when changing pages
    document.getElementById('faq-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white transition-colors flex items-center space-x-1 touch-target"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg transition-colors touch-target ${
            currentPage === i
              ? 'bg-lime-400 text-black font-semibold'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
          aria-label={`Page ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white transition-colors flex items-center space-x-1 touch-target"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    );

    return (
      <div className="flex items-center justify-center space-x-2 flex-wrap gap-2 mt-6">
        {pages}
      </div>
    );
  };

  if (loading) {
    return (
      <section id="faq-section" className="bg-gray-900 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <HelpCircle size={24} className="text-lime-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
          <span className="ml-3 text-gray-400">Loading FAQs...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="faq-section" className="bg-gray-900 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <HelpCircle size={24} className="text-lime-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadFAQs}
            className="bg-lime-400 hover:bg-lime-300 text-black font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section id="faq-section" className="bg-gray-900 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <HelpCircle size={24} className="text-lime-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <p className="text-center text-gray-400">No FAQs available at the moment.</p>
      </section>
    );
  }

  return (
    <section id="faq-section" className="bg-gray-900 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <HelpCircle size={24} className="text-lime-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
      </div>

      {/* Page Info */}
      <div className="text-center mb-4">
        <p className="text-gray-400 text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, faqs.length)} of {faqs.length} questions
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3 sm:space-y-4">
        {currentFAQs.map((faq, index) => {
          const isExpanded = expandedItems.has(faq.id);
          const questionNumber = startIndex + index + 1;
          
          return (
            <div
              key={faq.id}
              className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all duration-200 hover:border-lime-400/30"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-gray-750 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400/50 touch-target"
                aria-expanded={isExpanded}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <span className="bg-lime-400 text-black font-semibold px-2 py-1 rounded text-xs flex-shrink-0">
                    {questionNumber}
                  </span>
                  <h3 className="text-white font-medium text-sm sm:text-base leading-relaxed">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-3">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-lime-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="pl-8 sm:pl-10">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* SEO Enhancement Text */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-center text-gray-400 text-xs sm:text-sm">
          Have more questions about driving license preparation? These FAQs cover the most common queries about RTO tests, LLR applications, and driving license procedures in India.
        </p>
      </div>
    </section>
  );
};