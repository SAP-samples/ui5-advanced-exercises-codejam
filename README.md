[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ui5-advanced-exercises-codejam)](https://api.reuse.software/info/github.com/SAP-samples/ui5-advanced-exercises-codejam)

# SAP CodeJam - Advanced UI5

This repository contains the material for SAP CodeJam events on advanced UI5 topics. Please note that there is also a more beginner-friendly SAP CodeJam on UI5 available: [ui5-exercises-codejam](https://github.com/SAP-Samples/ui5-exercises-codejam)

Please check the [prerequisites](/chapters/00-prep-dev-environment/readme.md#1-prerequisites) before the event an make sure you meet them.

## Overview

The material in this repository builds on top of the [core principles of UI5](https://github.com/SAP-Samples/ui5-exercises-codejam), introducing you to more advanced topics and techniques. This repository is a step-by-step guide explaining how build apply these topics and techniques to an existing UI5 application to improve it and add more features. The finished app is a simple supermarket application that allows users to find products and see an 3D model of where they are located in the store. 

![The finished app](/chapters/07-deployment/application.png)

The finished application already exists in the [application/](/application) directory, but we want to rebuild it from scratch step by step. You can compare the finished app with your version in case you have issues along the way.

After reading all chapters and following the instructions, you will be able to use *advanced* (it's all relative, of course) UI5 features and techniques, such as OData V4 actions, debugging, developing custom controls, using third-party packages, testing and deployment.

## Previous Knowledge

The material in this repository aims to be as beginner friendly as possible, but covers more advanced topics and techniques about UI5. If you are totally new to UI5, the other [more basic SAP CodeJam on UI5](https://github.com/SAP-Samples/ui5-exercises-codejam) might be better suited. You will have the best learning experience with this repository if you have previously built UI5 applications, understand its fundamental concepts (for example its model-view-controller architecture), its development tools (the [UI5 Tooling](https://www.npmjs.com/package/@ui5/cli)), and now want to deepen your knowledge and improve your skills.

The material includes additional explanations in collapsable sections (see example below), whenever a concept is used that seasoned developers are probably already familiar with, but beginners might not be. You can decide for yourself whether you want to read or skip them.

See this example:

<details>
<summary>What is SAPUI5? 💬</summary>

<br>

> SAPUI5 is an HTML5 framework for creating cross-platform, enterprise-grade web applications in an efficient way.
>
> See this [blog post](https://blogs.sap.com/2021/08/23/what-is-sapui5/) for more information.

</details>

## Material Organization

The material consists of a series of chapters, each in their own directory. The chapters build on top of each other and are meant to be completed in the given order. Each of the [chapters](#chapters) has its own 'readme' file with explanations, instructions, code samples and screen shots. From a session flow perspective, we are taking a "coordinated" approach:

The instructor will set you off on the first chapter. Do not proceed to the next chapter until the instructor tells you to do so. If you finish a chapter before others, there are some questions at the end of each chapter for you to ponder.

> The exercises are written in a conversational way - this is so that they have enough context and information to be completed outside the hands-on session itself. To help you navigate and find what you have to actually do next, there are pointers like this ➡️ throughout that indicate the things you have to actually do (as opposed to just read for background information).

## Chapters

- [00 - Preparing the Development Environment](/chapters/00-prep-dev-environment/)
- [01 - Generating a Full-Stack Project](/chapters/01-generating-full-stack-project/)
- [02 - Preparing the CAP Server](/chapters/02-preparing-cap-server/)
- [03 - Adding Content to the UI5 Application](/chapters/03-adding-content-to-ui5-app/)
- [04 - Adding OData V4 Actions and Debugging](/chapters/04-adding-odata-v4-actions-and-debugging/)
- [05 - Custom Controls and Third-Party Packages](/chapters/05-custom-controls-and-third-party-packages/)
- [06 - Testing](/chapters/06-testing/)
- [07 - Deployment](/chapters/07-deployment/)

## Feedback

If you can spare a couple of minutes at the end of the session, please help the [author](https://github.com/nicoschoenteich) improve for next time by providing some feedback.

Simply use this [template](https://github.com/SAP-samples/ui5-advanced-exercises-codejam/issues/new?assignees=&labels=feedback&template=session-feedback-template.md&title=Session%20Feedback) link to create a special "feedback" issue, and follow the instructions in there.

Thank you!

## Support

Support for the content in this repository is available during SAP CodeJam events, for which this content has been designed. Otherwise, this content is provided 'as-is' with no other support.

## Contributing
If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](/LICENSE) file.
