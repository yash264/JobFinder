import random

#  performance database
performance_DB = {
    "poor": [
        {
            "suggest": "Start with beginner-friendly platforms. Choose one small course and commit to 20 minutes a day.",
            "motivate": "Every expert was once a beginner. Keep showing up."
        },
        {
            "suggest": "Join a literary club, record yourself explaining ideas, or read for powerful speaking tips.",
            "motivate": "Your current skill level doesn’t define your future. Your mindset does."
        },
        {
            "suggest": "Practice on platforms or even brain teasers and puzzles to strengthen your logic.",
            "motivate": "Progress isn't about being the best — it's about being better than yesterday."
        },
        {
            "suggest": "Take up creative hobbies — writing, sketching, design. Creativity improves with practice and exposure.",
            "motivate": "Small consistent steps lead to massive results over time."
        },
        {
            "suggest": "Volunteer to lead small group projects, even informally. Leadership is a muscle — the more you use it, the stronger it gets.",
            "motivate": "You have potential. Skills can be learned. Belief can be built."
        },
    ],
    "average": [
        {
            "suggest": "Pick one “career-defining” skill to master over the next 3 months. Focus builds mastery.",
            "motivate": "You’re not starting from scratch — you’re starting from experience."
        },
        {
            "suggest": "Volunteer to mentor juniors, lead small group tasks, or present at team meetings.",
            "motivate": "You have a solid base — now it's time to sharpen and specialize."
        },
        {
            "suggest": "Update regularly. Use action verbs, add quantifiable impact, and match job keywords.",
            "motivate": "Average is just a checkpoint — not your destination."
        },
        {
            "suggest": "Move beyond common questions. Learn STAR method, mock interview weekly, and study job-specific scenarios.",
            "motivate": "In a sea of average, small improvements make you stand out."
        },
        {
            "suggest": "Practice articulating ideas. Record short LinkedIn videos, join team discussions, or write blogs.",
            "motivate": "Every hour invested now separates you from 80% of other candidates."
        },
    ],
    "good": [
        {
            "suggest": "Target top-tier companies or freelance premium clients. Refine your personal brand.",
            "motivate": "You're not just job-ready — you're career-ready. Now aim for impact."
        },
        {
            "suggest": "Create a portfolio of business impact — not just what you did, but how it moved the needle.",
            "motivate": "You’re not competing with others — you’re competing with your own potential."
        },
        {
            "suggest": "Focus on architecture, decision-making, cost-efficiency, and cross-functional planning.",
            "motivate": "The market doesn’t just need your skills — it needs your voice."
        },
        {
            "suggest": "Start a mentoring circle, help early-career professionals, or create internal workshops.",
            "motivate": "You've mastered the tools. Now build the systems."
        },
        {
            "suggest": "Pick industry-recognized advanced credentials and become the go-to expert in a subdomain.",
            "motivate": "Excellence isn’t the end — it’s the beginning of leadership."
        },
    ],
}

def recommend_jobSeeker_suggestion(person_type):
    suggestions = performance_DB.get(person_type.lower())
    if suggestions:
        return random.sample(suggestions, 1)  # Recommend 1 random suggestions
    return []