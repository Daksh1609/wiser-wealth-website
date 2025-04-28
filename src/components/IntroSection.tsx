
const IntroSection = () => {
  return (
    <section className="mb-4 sm:mb-6 animate-fade-in border-b border-gray-200 pb-4 text-center px-4" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 mb-1 flex flex-col items-center gap-2">
        Why Use This Calculator?
      </h2>
      <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-700">
        The Finance Calculator helps you visualize your income and spending patterns. 
        It's designed to help you understand your savings, optimize your expenses, and plan better for the future.
        You can quickly adjust your expected costs and see how changes impact your savings.
      </p>
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold mb-4 text-base sm:text-lg text-purple-800">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors">
            <p className="font-medium">Track Fixed & Variable Expenses</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors">
            <p className="font-medium">Visualize Spending Patterns</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors">
            <p className="font-medium">Plan Investments & Savings</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors">
            <p className="font-medium">Simulate Financial Scenarios</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
