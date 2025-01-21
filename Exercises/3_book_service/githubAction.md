### Github Action
GitHub Actions is a CI/CD (Continuous Integration/Continuous Deployment) tool provided by GitHub to automate workflows in response to events in a repository. Below are key points explaining GitHub Actions:
	•	Automation Platform: Allows automation of software development workflows, such as testing, building, and deploying code.
	•	Event-driven: Workflows are triggered by GitHub events like pushes, pull requests, issues, and releases.
	•	Workflows: A workflow is a configurable, automated process made up of one or more jobs that can run in sequence or parallel. Defined in .github/workflows directory in the repository.
	•	Jobs: A job is a set of steps that run on a specific runner (machine) and can be executed sequentially or concurrently.
	•	Steps: Individual tasks in a job. A step can run a script or an action (a reusable unit of code).
	•	Actions: Predefined, reusable pieces of code that can be used to perform tasks like setting up environments, running tests, deploying code, etc.
	•	Runners: Virtual machines or containers that run the jobs. GitHub provides runners with common environments (e.g., Ubuntu, Windows, macOS), but self-hosted runners can also be used.
	•	Matrix Builds: You can define multiple configurations (such as testing against different OS or versions) that run in parallel, reducing build times.
There are others like artifacts, secrets and environments ...
There are others like Circle CI, Travis

Let's see that in an action. 
- create a .gthub directory
- files are written in yml format (yet another markup) similar to python
- Test the github integration!!