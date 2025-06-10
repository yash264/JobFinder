import random

#  performance database
performance_DB = {
    "poor": [
        {
            "suggest": "Use structured interview scorecards. Define 3–5 key traits and rate every candidate consistently.",
            "motivate": "Even the best products fail without the right people behind them."
        },
        {
            "suggest": "Write clear, focused job descriptions with must-have vs. nice-to-have sections.",
            "motivate": "Your next great hire may be hidden behind a better question or clearer criteria."
        },
        {
            "suggest": "Track candidate experiences. A bad interview process = lost talent and reputation.",
            "motivate": "The quality of your team starts with the quality of your process."
        },
        {
            "suggest": "Create a shared question bank for your team with role-specific questions.",
            "motivate": "Investing in how you hire is investing in the future of your business."
        },
        {
            "suggest": "Use blind resume reviews or diverse panels to reduce unconscious bias.",
            "motivate": "You don’t have to get it perfect. You just have to get better with each hire."
        },
    ],
    "average": [
        {
            "suggest": "Use collaborative job scoping with your team before writing the JD.",
            "motivate": "You're doing well — now it's time to do it intentionally and repeatably."
        },
        {
            "suggest": "Run a pre-interview alignment meeting to discuss what “great” looks like.",
            "motivate": "Good hires happen. Great hiring systems are designed."
        },
        {
            "suggest": "Track time-to-hire and quality-of-hire. Use data to improve decisions.",
            "motivate": "You’re ready to stop reacting — and start hiring proactively."
        },
        {
            "suggest": "Start a lightweight training module or mock interview session monthly.",
            "motivate": "The best hiring managers don’t just evaluate — they sell opportunity too."
        },
        {
            "suggest": "Automate but personalize follow-ups. Add “What to expect next” to your emails.",
            "motivate": "You're past guesswork — now it's about precision and consistency."
        },
    ],
    "good": [
        {
            "suggest": "Try project-based evaluations, async videos, or “culture-fit panels” beyond standard rounds.",
            "motivate": "You've mastered hiring — now it's time to scale it as a competitive advantage."
        },
        {
            "suggest": "Audit pipeline diversity, use blind screening tools, and train panels on inclusive evaluation.",
            "motivate": "Great companies are built by great hiring — and you’re already leading that charge."
        },
        {
            "suggest": "Start talent communities, internship funnels, or referrals-as-a-strategy programs.",
            "motivate": "You're in a position to lead the industry in how talent is discovered, empowered, and retained."
        },
        {
            "suggest": "Use AI tools to streamline screening, scheduling, and candidate engagement.",
            "motivate": "The difference between good and legendary companies is how they hire at scale."
        },
        {
            "suggest": "	Tie hiring metrics directly to business goals (revenue, velocity, innovation, etc).",
            "motivate": "Now's the time to mentor other hiring managers and build hiring as a core company capability."
        },
    ],
}

def recommend_jobProvider_suggestion(person_type):
    suggestions = performance_DB.get(person_type.lower())
    if suggestions:
        return random.sample(suggestions, 1)  # Recommend 1 random suggestions
    return []