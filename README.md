## <a name="tech-stack">Tech Stack</a>

- Next.js
- Javascript
- Clerk
- Gemini AI
- Drizzle ORM
- shadcn
- Tailwind CSS

## <a name="features">Features</a>

### Authentication
Implemented secure user logins using Clerk, supporting both social sign-on and traditional email/password methods to ensure safe and reliable user access.

### PostgreSQL and Drizzle Setup
Configured PostgreSQL database with Drizzle ORM, providing robust data management and seamless integration for efficient query handling.

### Drizzle ORM Queries
Crafted complex queries using Drizzle ORM to interact with the PostgreSQL database, ensuring efficient data retrieval and manipulation.

### AI Form Generation with Google Gemini API
Utilized the Google Gemini API to dynamically generate AI-driven forms, facilitating personalized interview setups tailored to individual user needs.

### Gemini API: AI Model Setup
Set up the Gemini API to integrate advanced AI models, enabling intelligent interaction and response generation throughout the interview process.

### AI Interview Question Generation
Developed functionality to generate AI-powered interview questions, offering diverse and challenging queries to simulate real interview scenarios.

### User Answer Recording
Enabled users to record their answers via web interface and microphone, capturing authentic responses for further analysis.

### Speech to Text Conversion
Implemented speech-to-text conversion for recorded answers, providing accurate and searchable text transcriptions of user responses.

### Response Recording and Saving
Ensured all user responses are securely recorded and saved, allowing for easy review and feedback on performance.

### Deployment on Cloud/Vercel
Deployed the application on Vercel, ensuring high availability, scalability, and seamless updates with cloud-based hosting.

### Responsive Design
Adopted responsive design principles for an optimal user experience across various devices, ensuring accessibility and functionality on different screen sizes and resolutions.


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/MuhammadHunainKhurram/mock-interview-app.git
cd mock-interview-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_DRIZZLE_DB_URL=

NEXT_PUBLIC_GEMINI_API_KEY=

NEXT_PUBLIC_INTERVIEW_QUESTION_AMOUNT=

NEXT_PUBLIC_INFORMATION="	Enable your camera and microphone and  click 'Start Interview'. Stay close to the microphone and try to answer questions clearly and concisely."


NEXT_PUBLIC_NOTE="Read each question carefully. Once you've read a question, click 'Record Answer' and answer the question. Do this for everu single question, and when you've reached the end, you can simply click 'End Interview'"
```

Replace the placeholder values with your actual Clerk, Gemini, Drizzle & getstream credentials. 
Also adjust the amount of questions along with your notes.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
