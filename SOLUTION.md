# AVIV technical test solution

You can use this file to write down your assumptions and list the missing features or technical revamp that should
be achieved with your implementation.

## Notes

##### Write here notes about your implementation choices and assumptions.

Considering my candidacy for the React-based Front End Developer position, I would be glad to provide an insightful walkthrough of the methodologies I have applied and the key implementations I’ve carried out for this project:

- Overall Implementation:
  CSS Customization: I extended the existing CSS, following the BEM (Block Element Modifier) methodology, to ensure consistency and maintainability in styling.
  Security Measures: For added security, I externalized the API URL and other sensitive information into a separate file, away from the main codebase.
  Routing: I implemented the routing as specified in the requirements, ensuring that all pages are accessible through defined routes.
  Default Routing and display: I added a default display page to handle cases where a user requests a route that hasn’t been defined, enhancing the user experience.
  TypeScript Interfaces: I employed TypeScript interfaces as an additional layer in React to catch errors at compile time rather than runtime, resulting in more robust code.

- Add Listing Section on Main Listings Page:
  Form Implementation: I created a form that accurately validates user input, distinguishing between text and number inputs, and processing them accordingly.
  Number Fields: I added ‘+’ and ‘-‘ buttons for number fields to facilitate easy increment and decrement operations, and provided placeholders to guide user input.
  Input Validation: I secured the input fields by implementing validation checks.
  Country List: I utilized a popular library to fetch and display an extensive list of countries, ensuring a global reach and enhancing user experience.
  Phone Number Formatting: I used another widely-recognized library to implement automatic phone number formatting based on the selected country, which enhances data consistency and improves user experience.
  Price Input: I formatted the price input to include a space every three digits for better readability, aligning with the Euro currency format.
  Type Definitions: For clarity and better code organization, I placed all type definitions in a separate file.
  Response Handling: I meticulously implemented logic to ensure that appropriate actions are taken based on the various response status codes received from API calls. For successful responses (200 and 201), I processed and displayed the data as required. For client-side errors (400), I provided user-friendly error messages, guiding users to correct their input. Unprocessable entities (422) triggered validation error messages, ensuring data integrity. Server-side errors (500) resulted in a generic error message, informing the user while maintaining system stability.
  Nested Attribute Interaction: I successfully interacted with data that had nested attribute objects.

- Listings Section on Main Listings Page:
  Data Retrieval: I implemented functions to fetch all necessary data, ensuring it is correctly retrieved and displayed.
  Data Formatting: I maintained consistency in data presentation throughout the application, formatting numerical data such as prices for easy readability.
  Pagination: I introduced pagination to enhance user navigation and application performance. Logic was implemented to disable the ‘previous’ button on the first page and the ‘next’ button on the last page to avoid navigation errors. Acknowledging that the backend’s pagination capabilities has not been implemented yet, I took the initiative to implement a frontend-driven pagination system. This approach allows us to simulate the intended user experience and assess the performance benefits, providing valuable insights for future backend integration. The primary motivation behind introducing pagination was to optimize the application’s performance, particularly crucial when handling large datasets and images. By loading only a subset of the data at a time, we significantly reduce the initial load time and memory usage, resulting in a faster and more efficient user experience. This is closely tied to the concept of lazy loading, where resources are loaded on-demand, further contributing to the application’s performance optimization and improved responsiveness.

- Price History Page:
  Utility Functions: Recognizing the need for reusable code, I created a ‘utils’ folder to house all utility functions that can be shared across various components, promoting clean coding practices.
  Backend Assumption: Although the backend consistently returns the same result regardless of the listingId provided, I have implemented front-end logic to handle dynamic data, ensuring the application is ready for future backend updates.
  Data Validation and Security Measures: In alignment with best security practices, I introduced an additional layer of data validation, meticulously verifying that the listingId is indeed a numerical value. This not only fortifies the application against potential errors but also serves as a safeguard, ensuring that only valid and expected data types are processed. Furthermore, to mitigate the risk of injection attacks, I employed the encodeURI function, adding an extra layer of security to our data handling procedures.


## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**

Well, to accurately identify what might be missing, let me first outline the key elements and strategies that I have implemented during this coding interview test:

Take a look at the main listings page that I designed and created:

![View of the Main Listings Page](/screenshot%20coding%20aviv%20interview%20main%20listings%20page.png)

Take a look at the price history page that I designed and created:

![View of the Price History Page](/screenshot%20coding%20aviv%20interview%20price%20history%20page.png)

Also, to further enhance user engagement and provide a more appealing visual experience during data retrieval, I have incorporated a loading spinner that becomes visible while the listing is being fetched and loaded:

![View of the Spinner when loading all content](/screenshot%20coding%20aviv%20interview%20main%20listings%20page%20loading.png)

In terms of implementation, here is what I have accomplished:
Code Quality and Consistency: I have prioritized maintaining a clean, organized, and consistently styled codebase using tools like Prettier. Additionally, I have refactored the code for better maintainability, modularized it for reusability across components (especially, having the /utils repository created), and so, ensured that all shared logic is centrally located.

Testing: The application is thoroughly tested, including unit, integration, and end-to-end tests using Jest and React Testing Library. Every component has associated tests to ensure its proper functionality, and I’ve focused on achieving high code coverage to ensure reliability. I have personally undertaken user testing sessions to meticulously assess the application's performance. This involved scrutinizing the response time of each API call, ensuring low latency, verifying the correctness of returned status codes, and evaluating the overall user experience.

In this project, I have executed the ESLint command using npm run lint:check to verify adherence to coding best practices. Following this, I addressed and resolved any issues identified, ultimately enhancing the overall code quality. I have also executed the Jest command using npm test, which successfully ran 25 test cases.

Performance Optimization: Various performance optimization strategies have been implemented. Also, I had Pagination to efficiently load and render data, ensuring that the application remains fast even as the dataset grows. While lazy loading isn’t currently implemented, it's certainly on the radar for future enhancements, particularly if the number of images or heavy components increases.

Security: Address security concerns, such as protecting against cross-site scripting (XSS), ensuring secure data transmission, and handling user authentication and authorization properly. I add encodeURIComponent to secure the argument listindId send in parameter, avoiding any injection. Also, if the url path is not one identify, i send a page error and a message telling that the url path is not good.

Security: Security has been a top priority, with measures in place to mitigate common web vulnerabilities such as XSS. User inputs are sanitized, and secure data transmission is ensured. For example, encodeURIComponent is used to secure URL parameters. Additionally, unauthorized URL paths are handled gracefully, providing users with an error page and a clear message.

Error Handling and Logging: Comprehensive error handling and logging are in place to catch and diagnose issues as they arise. I’ve used try...catch blocks where applicable, and console.log and console.error statements are utilized for debugging purposes. These logs will be replaced with a more robust logging system in production to centralize error reporting.

Responsive Design: Make sure the application provides a good user experience on various devices and screen sizes. I tested on different screens, adapt the css accordingly

Environment Configuration: Ensure that environment-specific configurations are set up correctly, such as API endpoints, feature toggles, etc. I put the environnement variables in .env, then it would be better to secure this parameters and also depend on the environnement set it up

Responsive Design: The application is designed to provide an optimal user experience across various devices and screen sizes. Thorough testing has been conducted on different screens, and CSS has been adjusted accordingly to ensure responsiveness.

Environment Configuration: Environment-specific configurations are set up correctly, with sensitive and environment-specific parameters stored securely in .env files. I have also ensured that these configurations can be easily adjusted based on the deployment environment.

Documentation: With additional time at my disposal, I would strive to create a more comprehensive and in-depth set of documentation. This would encompass everything from the intricacies of the codebase to the procedures required for setup and deployment. Such detailed documentation is invaluable, serving as a quick-start guide for new team members and significantly easing the process of future maintenance and updates. Ultimately, this contributes to a seamless workflow and ensures a consistent approach throughout the entire project.

By addressing these aspects, I am confident that the application is robust, secure, and ready for a smooth deployment to production.

I welcome any feedback you may have and eagerly anticipate your insights, as I am committed to continuously refining and improving the code.

- **How would you deploy your implementation?**

Deploying a React TypeScript application entails a series of critical steps. In my point of view, I will consider these stesps:

1. Build the Application:
   Execute the build script (e.g., npm run build) to generate a production-ready version of the application. This process involves compiling TypeScript to JavaScript, minifying code, optimizing images, and performing some other tasks to prepare the application for a production environment.

2. Choose a Hosting Platform:
   For this project, I've chosen to leverage AWS, a leading cloud provider, to ensure robust and scalable hosting solutions. While a containerized application stack using AWS ECS or Kubernetes, paired with load balancers and EC2 instances, offers excellent scalability for handling high traffic on both the front-end and back-end, my preference leans towards a combination of CloudFront and S3 for front-end hosting, complemented by CloudFront, API Gateway, and Lambda for the back-end services.
   The rationale behind this choice is multi-faceted:
   Geographical Distribution: AWS CloudFront, a content delivery network (CDN), significantly reduces latency by distributing the content across various global locations, directly translating to an enhanced user experience.
   Scalability: The integration of CloudFront, S3, Lambda, and API Gateway is proven to efficiently scale to accommodate millions of users, ensuring seamless service even under heavy load.
   Cost-Efficiency: Compared to a self-managed ECS or Kubernetes setup, this AWS-managed configuration reduces the overhead associated with maintenance, thereby leading to potential cost savings without compromising on performance or reliability.
   In summary, this hosting strategy is designed to provide a balance between performance, scalability, and cost, ensuring that the application remains responsive and reliable as it scales to meet user demand.

3. Configure Environment Variables:
   Ensure the proper setup of environment-specific variables, making a clear separation between development and production settings. This step is crucial to safeguard sensitive information and prevent unintended exposure. For this purpose, we utilize .env files to securely manage and access these variables.

4. Set Up CI/CD (Optional but Recommended):
   Implement Continuous Integration (CI) and Continuous Deployment (CD) pipelines using tools such as GitLab CI or Jenkins. These tools automate the processes of running tests, building the application, and deploying it from development to production environments upon every commit or merge to the main branch. Additionally, utilize Git for version control and to facilitate collaborative feature development. Integrate configuration management and infrastructure-as-code tools like Ansible and Terraform to automate the provisioning of AWS resources and the configuration of the application, ensuring a consistent and reproducible environment across all stages of development.

5. Set up a Custom Domain via AWS route53 for the applications.

6. Enable HTTPS:
   Ensure all traffic to and from your application is encrypted by serving it over HTTPS. Utilize AWS Certificate Manager to set up an SSL/TLS certificate, enhancing security and performance.

7. Other Implement Security Measures:
   Secure communications between the front-end, back-end, and database by utilizing authentication tokens and adhering to the principle of least privilege in IAM policies. Employ AWS WAF to protect against common web exploits like SQL injection and DDoS attacks.

8. Monitor and Optimize:
   Diligently monitor the application’s performance and error logs using tools such as AWS CloudWatch, Elasticsearch, Kibana, and Datadog.

9. Embrace Continuous Improvement:
   Regularly update dependencies, apply patches, and iterate based on user feedback and performance data. Aim to conduct these updates monthly, utilizing tools like AWS Systems Manager Patch Manager for efficiency.

10. Ensure that my application, especially if it 's a web application, is implementing proper security headers: Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options, Referrer Policy, Cross-Origin Resource Sharing (CORS)

11. Validate and sanitize more user inputs to protect my application against injection attacks such as SQL injection, NoSQL injection, and others.

- **If you had to implement the same application from scratch, what would you do differently?**

The folder structure of your React TypeScript project seems to be already well-organized and follows good practices for separation of concerns. However, there can be ways to improve and tailor the architecture of the project. Below are some suggestions to consider:

1. Component Architecture:
   I would adopt the atomic design methodology. This involves breaking down more the user interface into smaller building blocks and progressively combining them to form more complex UIs. This strategy not only enhances maintainability.

2. State Management:
   I would conduct a thorough analysis of the application's state management requirements. For a more complex state logic or intricate inter-component communication, a state management library like Redux would be apt. This ensures a scalable and well-organized management of the application state.

   Leverage more hooks like useCallback, useForm
   and incorporating more reputable libraries to faster my development.

3. Folder Organization:
   While the current project structure is well thought out, I would make some enhancements:
   Grouping by Feature: Shift completely to a feature-based grouping, ensuring all related files for a specific component or feature are co-located.
   Separate Business Logic: Extract the business logic from UI components, possibly into services or models folders, particularly as the project scales.
   Refined Testing Structure: Maintain the current approach of placing test files alongside their respective components, but consider a dedicated tests folder for larger components.
   Enhanced Style Organization: For extensive global styles, split them into smaller, thematic files for better manageability.
   API and Asset Management: Introduce specific folders for API calls and assets to streamline their organization. 5. Performance Optimization:
   Proactively address performance from the outset, employing strategies like code-splitting, lazy loading, and asset optimization to ensure a swift and seamless user experience.

4. Collaborative Development:
   By implementing these changes, the application’s structure would not only become more scalable and maintainable but also foster a collaborative and efficient development environment, making it easier for other developers to contribute.

5. I will incorporate other tools such as SonarQube, aiming for an exhaustive analysis and evaluation of the code quality. This will provide critical insights, including the identification of potential bugs, detection of code smells, unearthing of security vulnerabilities, and highlighting any deviations from established coding standards.

6. I have decided to incorporate Figma into our suite of design tools. This strategic decision is directed towards transforming our creative processes and cultivate an environment of instantaneous communication and feedback, and guarantee smooth and coherent transitions between the client's vision and the designer's interpretation. Ultimately, this strategy is intended to comprehensive preview of the final product, ensuring alignment and satisfaction across the board.

ultimately driving a more synchronized and efficient workflow across the entire design team.

In summary, these refinements aim to enhance the application’s performance, user experience, and maintainability, ultimately contributing to a more robust and successful project.

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/)

Handling an application with hundreds of thousands of listings, millions of prices, and millions of monthly users requires careful planning, optimization, and the right technology choices. Here are some strategies and considerations to address these challenges:

1.  Scalable Architecture:
    Microservices: Adopt a microservices architecture for manageable and independently scalable services.
    Serverless: Utilize AWS for a serverless approach in both front-end and back-end, eliminating the need for a load balancer. For front-end hosting, use a combination of CloudFront and S3, and for back-end services, use CloudFront, API Gateway, and Lambda.
    Geographical Distribution: Utilize AWS CloudFront for content distribution across global locations, enhancing user experience.
    Scalability: Ensure seamless service under heavy load with the scalable integration of CloudFront, S3, Lambda, and API Gateway.
    Cost-Efficiency: Opt for AWS-managed configurations (CloudFront, S3, Lambda, and API Gateway) over self-managed ECS or Kubernetes for maintenance cost savings without sacrificing performance or reliability.

2.  Database Optimization:
    Scalability: Opt for a scalable database solution and consider implementing sharding to distribute data across multiple machines efficiently.
    Indexing: Ensure the database is meticulously indexed to expedite query processing and enhance performance.
    Caching: Implement strategic caching for frequently accessed data to alleviate the load on the database.
    AWS Aurora Over Postgres: Favor AWS Aurora over Postgres due to its superior performance and scalability provided by AWS.
    NoSQL Option: Given the minimal table interdependencies in this project, consider a NoSQL database for scenarios demanding millisecond-level latency. MongoDB or DynamoDB are strong candidates, with MongoDB offering enhanced support for join operations.

3.  Caching and Content Delivery Network (CDN):
    Edge Caching: Leverage a Content Delivery Network (CDN) to cache static assets like images, JavaScript, and CSS, bringing resources closer to users and minimizing latency.
    Application Caching: Use in-memory data stores like Redis for caching frequently accessed data.

4.  Code and Asset Optimization:
    For later, optimize Images and Assets: Ensure that images and assets are optimized for the web, using the correct formats and compression.
5.  Concurrency and Asynchronous Operations:
    Ensure non-blocking API calls and take advantage of Node.js for handling multiple asynchronous tasks.

6.  Performance Monitoring and Optimization:
    Monitoring Tools: Implement AWS CloudWatch for basic monitoring and log management. To enhance your monitoring capabilities and facilitate incident anticipation, consider integrating additional tools like Datadog, Kibana, Elasticsearch and Graphana. Ensure proper log transformation and distribution to make the most out of these platforms.

7.  Leverage React for Optimal Performance: Continue utilizing React, one of the leading JavaScript frameworks, known for its virtual DOM feature. This enables efficient updates and rendering, as React intelligently determines which components have changed and only re-renders those, setting it apart from other JavaScript frameworks.

8.  Security:
    Secure your APIs with proper authentication and authorization, use IAM for secure service interactions, and ensure data encryption in transit and at rest with HTTPS and AWS KMS.

9.  Given the large number of users, implementing an authentication system would be highly beneficial. We can consider using either the Google API or Amazon Cognito.

10. Disaster Recovery and Redundancy:
    Have a robust backup and recovery plan, and design for high availability with redundant systems.

11. Scalable Hosting and Infrastructure:
    Leverage AWS and serverless architectures to ensure scalable and efficient hosting, dynamically allocating resources in response to traffic demands. This methodology significantly cuts down on maintenance needs and boosts operational efficiency, with AWS Lambda providing robust serverless computing capabilities.

12. User Experience and Accessibility:
    Optimize user flows for performance, particularly in listing and price retrieval, and utilize tools like Google PageSpeed Insights for performance scoring and SEO.

13. Architectural Benchmarking:
    Perform benchmark assessments by executing load testing to prepare for peak usage, and uphold stringent quality assurance practices. Ensure these processes occur on a development server that serves as an exact replica of the production environment, maintaining consistent characteristics across both environments.

14. Cost Management:
    Regularly monitor and optimize infrastructure costs, striving for resource efficiency and cost-effectiveness. Stay updated on new technological advancements and features through continuous technology watch practices.

15. Allow me to present the architecture I recommend and will be implementing on the AWS cloud provider:

![AWS Architecture for millions users](/Aviv_Technical_Test_Architecture%20vThierryVO%202023%2010%2031.png)

By addressing these areas, you should be able to build and maintain a robust and scalable application capable of handling hundreds of thousands of listings, millions of prices, and millions of users every month.
