White paper: NPM, Open-source software modules Security
Over the past five years open-source software, web development, and JavaScript have gone through quite a change. While not a new attack technique, targeted supply-chain attacks are proving to be effective when applied in new ways, specifically within these spaces.
Before discussing the individual incidents it's worthwhile to understand why tools like NPM (Node Package Manager from npm, Inc.) and GitHub are becoming commonplace.
 
GitHub
GitHub started as a SaaS offering built around git, the foremost version control system. GitHub has grown from a "git SaaS offering", to also include features for: team collaboration, wikis, licensing, static sites (for projects), public and private repositories, project management and CI/CD automation, and (pertinent to this paper) automated alerts and updates for insecure project dependencies. What used to be a singularly focused "developer-community" resource is now a platform central to businesses and tech startups' core operations. Impressively, it remains a useful means for sharing open-source software globally among individuals. Of special note is, in the past couple years, Microsoft has acquired GitHub (June 2018) and GitHub has acquired npm, Inc (March 2020).
 
JavaScript & NPM
NPM is an online repository for JavaScript modules. NPM started as a tool primarily for use with Node.js projects, but as the JavaScript ecosystem has changed to fit the rapid changes in web application development, it has now become a place to share JavaScript modules for Node.js and the web. Also, the way web applications are written has changed because our use and expectations of them have changed. Instead of trying to merely impart slight interactivity to a web page, developers are tasked with building entire applications (UI, styling, logic, application state, connectivity, etc.) in the browser. This is a side-effect of the advances in mobile development, and the prevailing technology cloud architectures have become. Therefore, the JavaScript language (ECMAScript, to be exact) has undergone drastic changes, type-systems were introduced with projects like TypeScript, and frameworks and libraries such as React, Angular, and Vue provide a starting point for developing these new applications. 
 
So, in modern software development, using tools and services like GitHub and NPM are almost necessities. It is still possible to avoid specifically GitHub and NPM by choosing to remain in older ecosystems, or by making deliberate choices around them. However, access to a package management system for sharing open-source code is all but a constant today. The speed and complexity of modern design requirements exceed what many teams can do without relying on the capabilities of open-source software packages.


Incidents

NPM packages: malicious intent & dropping packages
 
Kik & left-pad (general outage by failed builds)
In March 2016, developer Azer Koçulu and messaging service Kik had a disagreement about the chosen name for one of Azer's published NPM packages, aptly named "kik". Kik requested Azer change the name of the package (to not collide with their own name), but Azer contested and resolved to abruptly remove not only the offending "kik" package but also the other 272 packages he had also published. 
 
One of the removed packages was "left-pad", an unsuspecting package--it merely added whitespace padding on the left side of a string. This was a non-descript unsuspecting package until its removal started breaking thousands of software builds. At the time, NPM had very few mitigations in place for this type of scenario. So even though Cameron Westland, another npm package author, realized what happened and published a solution within 10 minutes, the interruption lasted roughly 2.5 hours. The interruption lasted longer than 10-15 minutes because NPM had to make decisions around republishing a package and working with package authors in a new way.
Ref: https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm

event-stream incident
On November 26, 2018 NPM's security team was notified of the malicious "event-stream" package. Much different from the "kik/left-pad" incident, this time social engineering took over as the attacker posed as a package maintainer until the intended target had pulled the "event-stream" package into their projects.
 
The malicious code only targeted the specific development environment of the Copay application. When a developer kicked off a release build script, through a series of convoluted steps, the modified code was bundled into the application. Ultimately, the attack was designed to harvest account details and private keys from Bitcoin wallet accounts.
Ref: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident

electron-native-notify
Another incident of using an npm package to steal cryptocurrency was discovered on June 4, 2019. The NPM Security team worked with Komodo to determine the "electron-native-notify" package was maliciously updated with logic to steal credentials from users of the Komodo Agama cryptocurrency wallet.
 
Even though such an attack likely took several months of monitoring and planning by the attacker to carry out, the good news is that once discovered the NPM Security team discovered the issue, it was quickly mitigated.
Ref: https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm

Octopus Scanner Malware, GitHub distribution

The incident known as Octopus Scanner is essentially malware designed to enumerate and backdoor Netbeans projects (Netbeans, a Java IDE). This was an impressive piece of malware that, at a high level, did several things:
-	Identify user's NetBeans directory (operating on a developer’s system)
-	Enumerate all projects in the NetBeans directory
-	Copy malicious payload cache.dat to nbproject/cache.dat
-	Modify the nbproject/build-impl.xml file to make sure the malicious payload is executed every time NetBeans project is build
-	If the malicious payload is an instance of the Octopus Scanner itself the newly built JAR file is also infected.

The GitHub SIRT team summarized why this type of attack is especially concerning:

“In an OSS [open-source software] context, it gives the malware an effective means of transmission since the affected projects will presumably get cloned, forked, and used on potentially many different systems. The actual artifacts of these builds may spread even further in a way that is disconnected from the original build process and harder to track down after the fact.
Since the primary-infected users are developers, the access that is gained is of high interest to attackers since developers generally have access to additional projects, production environments, database passwords, and other critical assets. There is a huge potential for escalation of access, which is a core attacker objective in most cases.”
-- “Octopus Scanner malware”, GitHub SIRT

It is unclear how the original infections took place, but downstream systems seemed to be infected by cloning an infected project. Once this took place, the infected artifacts could begin their process of latching onto the Netbeans build process.

However, what is particularly interesting is the motive for such an attack. Netbeans is not the most common Java IDE, so the level of technical complexity for this effort suggests it may have been a targeted attack. Again, obfuscated due to the attack vector being open-source supply chain(s).
Ref: https://www.darkreading.com/vulnerabilities---threats/github-supply-chain-attack-uses-octopus-scanner-malware/d/d-id/1337943


Common Tactics
There are many ways to carry out these supply chain attacks, however the two main: techniques used are social engineering and typo-squatting.
 
Social Engineering
Pretending to be a contributor/maintainer, and then switching to malicious contributions once the target has started using the package/payload. Unfortunately, mitigating against this attack vector is difficult for individual developers and teams due to its subtlety. This is why npm and GitHub have put strong efforts forward in their individual security response teams. These teams work to investigate when malicious packages have been put in place and remove those users and the packages related to the malicious activity.
 
Typo-squatting
This is the same idea as using slight misspellings to lure people into illegitimate websites. The "npm install" command will work if the package exists--regardless of the author or intent of the underlying code. However, in order to mitigate against this attack vector, npm has released a package [<>] to help validate packages before install and some naming rules (listed below).

1.	Can’t start with a “.” (period)
2.	Can’t start with a _ (underscore)
3.	Can’t have leading or trailing spaces.
4.	It can’t be “node_modules” and it can’t be “favicon.ico”.
5.	It is limited to 214 characters.
6.	No capital letters allowed, only lowercase.
7.	These special characters are not allowed: “~\’!()*”)’
8.	Modules names must adhere to the typosquatting rules mentioned above.

Ref: Typo-squatting, naming rules: https://medium.com/@liran.tal/fighting-npm-typosquatting-attacks-and-naming-rules-for-npm-modules-a0b7a86344aa


Detecting

NPM Security & GitHub Security Incident Response Team (SIRT)
It seems that most of these supply-chain attacks are discovered and mitigated by developers and other companies providing tips to the NPM Security and GitHub SIRT. It might not sound like much, but according to André Eleuterio of NPM Security, they receive dozens of reports each week.
Ref: https://github.com/security/incident-response

In general, these reports are individually researched, and appropriate actions are taken. Most of the time very few mitigations are needed. However, these teams usually post a post-mortem write up (like those summarized above) for the larger or more interesting events. While actively detecting and tracking a supply-chain attack in open-source modules can be a novel difficulty, keeping a watchful eye on these outlets at least provides a verified source for new threats.


Tools & Mitigation Tactics

After seeing how many "supply-chain attack events" have occurred and the effort being placed on combating them, the next step is determining how to mitigate individually. Unfortunately, mitigations have few guarantees, but they essentially boil down to controlling package use.
 
Dependency Updating
The first, and most easily applied, is a direct approach. Npm has built-in a utility command to their npm-cli tool: "npm audit". A limited but useful practice is to make a habit of running "npm audit" in the development process for web applications. The major benefit is this gives us a security/audit tool automatically included in the development process, and can be automated to run in the CI/CD process.
 
Private/Custom Package Repositories
The following tools are not specific to web development or a language (i.e. JavaScript), unlike npm. Using a private package manager could be described as a "trust, but verify" security model. A private repository also introduces the benefit of being able to have structured management and development for private packages as well.
 
-	GitHub package registry: https://github.com/features/packages
-	Verdaccio: https://verdaccio.org/docs/en/what-is-verdaccio.html
-	Azure Artifacts: https://docs.microsoft.com/en-us/azure/devops/artifacts/start-using-azure-artifacts?view=azure-devops
 

“Community” Tools
GitHub has a vested interest in keeping its users safe (NPM, too), and in that vein is starting to produce more opportunities and tools to mitigate against insecure code—supply-chain attacks or otherwise.

-	GitHub Security Lab
o	Missionally different from the GitHub SIRT, Security Lab is more research and development focused. They research open-source projects, disclose vulnerabilities in CVEs, and produce CodeQL—a semantic code analysis engine.
-	Secret scanning
o	Scanning repositories for known types of secrets to prevent them being used fraudulently. Ex: accidentally checking in credentials for an external service.
-	Code scanning (currently in limited beta)
o	Static code analysis for code repositories hosted on GitHub. 
-	Dependabot security updates
o	Monitors security advisories from WhiteSource and the GitHub Advisory Database, and automatically creates a pull request in a repository to update the known vulnerable dependency.
-	Exploring dependencies: Dependency graph
o	A simplistic viewer for a repository’s dependencies and any detected vulnerabilities.

Conclusion

Supply-chain attacks are not particularly novel, and there are still many questions around the use of open-source software. Regardless of how the attacks are detected, in each of the incidents listed above the best tool for repairing the broken supply-chains was an automated deployment pipeline. 
While the tools for managing, packaging, and distributing software are becoming better we can look to this attack vector and these incidents as greater evidence for a cohesive push towards for DevSecOps practices. It is no longer enough to think of software or systems as something left to be secured after deployment. The same tools used to automate software and architecture deployments…can also be used to introduced higher levels of security while maintaining our productivity.
“Supply chain security is about the integrity of the entire software development and delivery ecosystem.”
-- Alvaro Muñoz, GitHub SIRT post-mortem on Octopus Scanner malware 
Sources

Azure Artifacts
-	https://docs.microsoft.com/en-us/azure/devops/artifacts/start-using-azure-artifacts?view=azure-devops

CodeQL (GitHub)
-	https://securitylab.github.com/tools/codeql

event-stream incident
-	https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident

electron-native-notify package, stealing crypto-currency
-	https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm

ECMAScript
-	https://www.ecma-international.org/publications/standards/Ecma-262.htm

GitHub Security Incident Response Team (SIRT)
-	https://github.com/security/incident-response

GitHub code scanning
-	https://docs.github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning

GitHub Dependabot
-	https://docs.github.com/en/github/managing-security-vulnerabilities/configuring-github-dependabot-security-updates

GitHub Dependency graph
-	https://docs.github.com/en/github/visualizing-repository-data-with-graphs/exploring-the-dependencies-and-dependents-of-a-repository

Octopus Scanner malware
-	GitHub SIRT: https://securitylab.github.com/research/octopus-scanner-malware-open-source-supply-chain
-	Dark Reading: https://www.darkreading.com/vulnerabilities---threats/github-supply-chain-attack-uses-octopus-scanner-malware/d/d-id/1337943

GitHub “secret scanning”
-	https://docs.github.com/en/github/administering-a-repository/about-secret-scanning

GitHub Security Lab
-	https://securitylab.github.com/

Kik, left-pad, and NPM
-	https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm

Typo-squatting, naming rules
-	https://medium.com/@liran.tal/fighting-npm-typosquatting-attacks-and-naming-rules-for-npm-modules-a0b7a86344aa

Verdaccio
-	https://verdaccio.org/docs/en/what-is-verdaccio.html

