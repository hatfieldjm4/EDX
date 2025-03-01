# edxcli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [edxcli](#edxcli)
* [Installation](#installation)
* [GitHub Action Maintenance](#github-action-maintenance)
* [Usage](#usage)
* [Commands](#commands)
* [Debugging](#debugging)
* [Quarterly Scans](#quarterly-scans)
* [Release Notes](#release-notes)
<!-- tocstop -->

- [edxcli](#edxcli)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
    - [Airtable access](#airtable-access)
    - [Touchpoints](#touchpoints)
- [GitHub Action Maintenance](#github-action-maintenance)
- [Usage](#usage)
- [Commands](#commands)
  - [`edxcli data condense`](#edxcli-data-condense)
  - [`edxcli help [COMMANDS]`](#edxcli-help-commands)
  - [`edxcli plugins`](#edxcli-plugins)
  - [`edxcli plugins:install PLUGIN...`](#edxcli-pluginsinstall-plugin)
  - [`edxcli plugins:inspect PLUGIN...`](#edxcli-pluginsinspect-plugin)
  - [`edxcli plugins:install PLUGIN...`](#edxcli-pluginsinstall-plugin-1)
  - [`edxcli plugins:link PLUGIN`](#edxcli-pluginslink-plugin)
  - [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin)
  - [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin-1)
  - [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin-2)
  - [`edxcli plugins update`](#edxcli-plugins-update)
  - [`edxcli websites`](#edxcli-websites)
  - [`edxcli websites fetch SOURCE`](#edxcli-websites-fetch-source)
  - [`edxcli websites push`](#edxcli-websites-push)
  - [`edxcli websites scan`](#edxcli-websites-scan)
  - [`edxcli websites scan bulk`](#edxcli-websites-scan-bulk)
- [Debugging](#debugging)
  - [Examples](#examples)
- [Quarterly Scans](#quarterly-scans)
  - [1. Run Bulk Scan](#1-run-bulk-scan)
  - [2. Consolidate Scan Outputs for IT Metric](#2-consolidate-scan-outputs-for-it-metric)
  - [3. Backup Scan Data to Google Drive](#3-backup-scan-data-to-google-drive)
  - [4. Copy data into Airtable](#4-copy-data-into-airtable)
  - [5. Send Airtable Report to GEAR Team](#5-send-airtable-report-to-gear-team)
  - [6. Send Scan Export to GEAR Team](#6-send-scan-export-to-gear-team)
    - [6.1 Produce GEAR data export](#61-produce-gear-data-export)
    - [6.2 Backup Data in Drive](#62-backup-data-in-drive)
- [Release Notes](#release-notes)
  - [1.0.0](#100)
  - [0.0.25](#0025)
  - [0.0.24](#0024)
  - [0.0.23](#0023)
  - [0.0.22](#0022)
  - [0.0.21](#0021)
  - [0.0.20](#0020)
  - [0.0.19](#0019)
  - [0.0.18](#0018)
  - [0.0.17](#0017)
  - [0.0.16](#0016)
  - [0.0.15](#0015)
  - [0.0.14](#0014)
  - [0.0.13](#0013)
  - [0.0.12](#0012)
  - [0.0.11](#0011)
  - [0.0.10](#0010)
  - [0.0.9](#009)
  - [0.0.8](#008)
  - [0.0.7](#007)
  - [0.0.6](#006)
  - [0.0.5](#005)
  - [0.0.4](#004)
  - [0.0.3](#003)
  - [0.0.2](#002)
  - [0.0.1](#001)

# Installation

## Prerequisites

Create .env file
`echo "TOUCHPOINTS_API_KEY=\nAIRTABLE_API_KEY=" >> .env`

### Airtable access

- Have team member add you as administrator on the "EDX Website Team Eval Interviews" Base in Airtable
- [Create Personal Access Token](https://airtable.com/create/tokens/new)
  - Scopes:
    - `data.records:read`
    - `data.records:write`
  - Access
    - EDX Website Team Eval Interviews
- Add PAT to `.env` file as value of AIRTABLE_API_KEY

### Touchpoints

- Navigate to [https://touchpoints.digital.gov/](https://touchpoints.digital.gov/)
- Sign in
- Click on email address in header to go to [User Profile](https://touchpoints.app.cloud.gov/profile) page
- Copy API key and add to `.env` as value of TOUCHPOINTS_API_KEY

# GitHub Action Maintenance

A handful of GitHub Actions run against the EDX CLI with each PR as well as weekly jobs. As such, repository secrets must be maintained and updated by repo admins.

GitHub Action Repository secrets share the same names as the keys in `.env`. As team members roll on and off, update secrets to be tied to active users.

# Usage

<!-- usage -->
```sh-session
$ npm install -g edxcli_gsa
$ edxcli COMMAND
running command...
$ edxcli (--version)
edxcli_gsa/1.0.0 darwin-x64 node-v18.16.0
$ edxcli --help [COMMAND]
USAGE
  $ edxcli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`edxcli data condense`](#edxcli-data-condense)
* [`edxcli help [COMMANDS]`](#edxcli-help-commands)
* [`edxcli plugins`](#edxcli-plugins)
* [`edxcli plugins:install PLUGIN...`](#edxcli-pluginsinstall-plugin)
* [`edxcli plugins:inspect PLUGIN...`](#edxcli-pluginsinspect-plugin)
* [`edxcli plugins:install PLUGIN...`](#edxcli-pluginsinstall-plugin-1)
* [`edxcli plugins:link PLUGIN`](#edxcli-pluginslink-plugin)
* [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin)
* [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin-1)
* [`edxcli plugins:uninstall PLUGIN...`](#edxcli-pluginsuninstall-plugin-2)
* [`edxcli plugins update`](#edxcli-plugins-update)
* [`edxcli websites`](#edxcli-websites)
* [`edxcli websites fetch SOURCE`](#edxcli-websites-fetch-source)
* [`edxcli websites push`](#edxcli-websites-push)
* [`edxcli websites scan`](#edxcli-websites-scan)
* [`edxcli websites scan bulk`](#edxcli-websites-scan-bulk)

## `edxcli data condense`

Consolidates json output from website scans into CSV files

```
USAGE
  $ edxcli data condense [--loglevel error|info|debug] [-f <value>] [-o <value>] [-c
    default|gearScans|lighthouseAccessibility|uswds]

FLAGS
  -c, --collection=<option>  [default: default] A pre-defined set of fields to extract into CSV
                             <options: default|gearScans|lighthouseAccessibility|uswds>
  -f, --folders=<value>      List of comma-separated folders within the /data/scans directory.
  -o, --output=<value>       [default: /data/condensedData] Output directory. Defualts to current directory
  --loglevel=<option>        [default: info]
                             <options: error|info|debug>

DESCRIPTION
  Consolidates json output from website scans into CSV files

EXAMPLES
  $ edxcli data condense

  $ edxcli data condense -f "20220719,20220720"

  $ edxcli data condense -o customDirectory

  $ edxcli data condense -c "lighthouseAccessibility"
```

## `edxcli help [COMMANDS]`

Display help for edxcli.

```
USAGE
  $ edxcli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for edxcli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `edxcli plugins`

List installed plugins.

```
USAGE
  $ edxcli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ edxcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.6/src/commands/plugins/index.ts)_

## `edxcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ edxcli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ edxcli plugins add

EXAMPLES
  $ edxcli plugins:install myplugin 

  $ edxcli plugins:install https://github.com/someuser/someplugin

  $ edxcli plugins:install someuser/someplugin
```

## `edxcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ edxcli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ edxcli plugins:inspect myplugin
```

## `edxcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ edxcli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ edxcli plugins add

EXAMPLES
  $ edxcli plugins:install myplugin 

  $ edxcli plugins:install https://github.com/someuser/someplugin

  $ edxcli plugins:install someuser/someplugin
```

## `edxcli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ edxcli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ edxcli plugins:link myplugin
```

## `edxcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ edxcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edxcli plugins unlink
  $ edxcli plugins remove
```

## `edxcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ edxcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edxcli plugins unlink
  $ edxcli plugins remove
```

## `edxcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ edxcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edxcli plugins unlink
  $ edxcli plugins remove
```

## `edxcli plugins update`

Update installed plugins.

```
USAGE
  $ edxcli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `edxcli websites`

Performs a number of operations against lists of websites published by Touchpoints https://github.com/GSA/touchpoints/wiki/API#available-api-endpoints and Site Scanner https://open.gsa.gov/api/site-scanning-api/

```
USAGE
  $ edxcli websites [--loglevel error|info|debug]

FLAGS
  --loglevel=<option>  [default: info]
                       <options: error|info|debug>

DESCRIPTION
  Performs a number of operations against lists of websites published by Touchpoints
  https://github.com/GSA/touchpoints/wiki/API#available-api-endpoints and Site Scanner
  https://open.gsa.gov/api/site-scanning-api/

EXAMPLES
  $ edxcli websites fetch Touchpoints

  $ edxcli websites fetch "Site Scanner"

  $ edxcli websites push

  $ edxcli websites scan

  $ edxcli websites scan bulk
```

_See code: [dist/commands/websites/index.ts](https://github.com/gsa/edx/blob/v1.0.0/dist/commands/websites/index.ts)_

## `edxcli websites fetch SOURCE`

Retrieves a list of websites from one or more data sources.

```
USAGE
  $ edxcli websites fetch SOURCE [--loglevel error|info|debug] [-o <value>]

ARGUMENTS
  SOURCE  (Site Scanner|Touchpoints) Website list source

FLAGS
  -o, --output=<value>  [default: data/fetch] Output directory. Defualts to current directory
  --loglevel=<option>   [default: info]
                        <options: error|info|debug>

DESCRIPTION
  Retrieves a list of websites from one or more data sources.

EXAMPLES
  $ edxcli websites fetch "Site Scanner"

  $ edxcli websites fetch Touchpoints -o ~/mydirectory
```

## `edxcli websites push`

Grabs an extract of Touchpoints data and updates or inserts it into Airtable. If the data in Touchpoints matches Airtable, the script will record that an "update" was made but Airtable will not show an updated modified date.

```
USAGE
  $ edxcli websites push [--loglevel error|info|debug] [-o <value>]

FLAGS
  -o, --output=<value>  [default: data/push] Output directory. Defualts to /edxcli/data/push directory
  --loglevel=<option>   [default: info]
                        <options: error|info|debug>

DESCRIPTION
  Grabs an extract of Touchpoints data and updates or inserts it into Airtable. If the data in Touchpoints matches
  Airtable, the script will record that an "update" was made but Airtable will not show an updated modified date.

EXAMPLES
  $ edxcli websites push

  $ edxcli websites push -o ~/mydirectory
```

## `edxcli websites scan`

Scans websites using various facets to capture information about the sites. Running multiple facets requires individual -f inputs and does not take a list.

```
USAGE
  $ edxcli websites scan -d <value> [--loglevel error|info|debug] [-f
    cuiBanner|itPerformanceMetric|lighthouseDesktop|lighthouseMobile|metadataTags|screenshot|searchEngine|siteScanner|us
    wdsComponents] [--headless] [-o <value>] [-p |all|edx scan] [--auth]

FLAGS
  -d, --domains=<value>     (required) Comma-separated list of domains to scan.
  -f, --facets=<option>...  Comma-separated list of facets to use for the scan. e.g. (-f screenshot -f lighthouseDesktop
                            -f itPerformanceMetric).
                            <options: cuiBanner|itPerformanceMetric|lighthouseDesktop|lighthouseMobile|metadataTags|scre
                            enshot|searchEngine|siteScanner|uswdsComponents>
  -o, --output=<value>      Output directory. Defualts to current directory
  -p, --preset=<option>     Run a pre-configured suite of scan facets whose results will be output into a single file.
                            <options: |all|edx scan>
  --auth                    Boolean flag denoting whether or not to prompt for basic auth credentials for the given
                            site. Defaults to false
  --[no-]headless           Boolean flag, whether or not to run scans in headless mode. Defaults to true
  --loglevel=<option>       [default: info]
                            <options: error|info|debug>

DESCRIPTION
  Scans websites using various facets to capture information about the sites. Running multiple facets requires
  individual -f inputs and does not take a list.

EXAMPLES
  $ edxcli websites scan -d gsa.gov -f screenshot

  $ edxcli websites scan -d buy.gsa.gov -f "screenshot" -f "lighthouseMobile" -f "siteScanner" -o ~/some/other/directory

  $ edxcli websites scan -d buy.gsa.gov -f screenshot -o ~/some/other/directory

  $ edxcli websites scan -d sftool.gov -p "all"

  $ edxcli websites scan -d "18f.gsa.gov,buy.gsa.gov,gsa.gov" -p "edx scan" --no-headless

  $ edxcli websites scan -d "18f.gsa.gov" -f "screenshot" --loglevel debug

  $ edxcli websites scan -d "18f.gsa.gov" -f "screenshot" --auth
```

## `edxcli websites scan bulk`

Scans websites using various modules to capture information about the sites

```
USAGE
  $ edxcli websites scan bulk [--loglevel error|info|debug] [-d Touchpoints] [-f
    cuiBanner|itPerformanceMetric|lighthouseDesktop|lighthouseMobile|metadataTags|screenshot|searchEngine|siteScanner|us
    wdsComponents] [--headless] [-o <value>] [-p |all|edx scan] [--resume]

FLAGS
  -d, --domainsSource=<option>  [default: Touchpoints] Name of the system to pull the list of domains
                                <options: Touchpoints>
  -f, --facets=<option>...      Comma-separated list of facets to use for the scan. e.g. (-f screenshot -f
                                lighthouseDesktop -f itPerformanceMetric).
                                <options: cuiBanner|itPerformanceMetric|lighthouseDesktop|lighthouseMobile|metadataTags|
                                screenshot|searchEngine|siteScanner|uswdsComponents>
  -o, --output=<value>          Output directory. Defualts to current directory
  -p, --preset=<option>         Run a pre-configured suite of scan facets whose results will be output into a single
                                file.
                                <options: |all|edx scan>
  --[no-]headless               Boolean flag, whether or not to run scans in headless mode. Defaults to true
  --loglevel=<option>           [default: info]
                                <options: error|info|debug>
  --resume                      Resumes a previously launched operation. If a local cache file is not found, begins the
                                process from scratch.

DESCRIPTION
  Scans websites using various modules to capture information about the sites

EXAMPLES
  $ edxcli websites scan bulk -d Touchpoints -p "edx scan"

  $ edxcli websites scan bulk -d Touchpoints --resume
```
<!-- commandsstop -->

<!-- Updating -->

```sh
yarn run build
yarn run test
yarn run prepack
```

# Debugging

[Debug](https://github.com/debug-js/debug) is used for debugging scans. Debug statements use the file name and path as keys for debug statements.

## Examples

To turn on debug globally for the CLI prefix commands with `env DEBUG="edxcli:*"`.

Turn on debug for website scan screenshot facet
`env DEBUG="edxcli:helpers:websites:screenshot" bin/run websites scan -d labs.gsa.gov -f screenshot`

Turn on debug for all statements containing "scan"
`env DEBUG="*scan*" bin/run websites scan -d gsa.gov`

Turn on debug for all puppeteer internals
`env DEBUG="puppeteer*" bin/run websites scan -d gsa.gov`

<!-- Quarterly Scans -->

# Quarterly Scans

After quarterly scans are run against the list of websites, a number of actions are required.

1. Run bulk scan
2. Consolidate Scan outputs into IT Performance Metric Report
3. Backup scan data to Google Drive
4. Copy data into Airtable
5. Send Airtable export to GEAR team
6. Send Scan Export to GEAR Team

## 1. Run Bulk Scan

`bin/run websites scan bulk -p "edx scan" --no-headless`

## 2. Consolidate Scan Outputs for IT Metric

`bin/run data condense -f {folder(s)}`

For example, if the scans were run over two days, you'd enter:

`bin/run data condense -f "20230402,20230403"`

Scan outputs will require some updates in Sheets in order to produce the IT Metric outputs. See :lock: [https://docs.google.com/document/d/1lzs4acbRg1Wr55Nk9TEGyz4Dro_uAhrqZFAqgSzYIgM/edit#heading=h.384sb3ahl2st](https://docs.google.com/document/d/1lzs4acbRg1Wr55Nk9TEGyz4Dro_uAhrqZFAqgSzYIgM/edit#heading=h.384sb3ahl2st) for full details.

## 3. Backup Scan Data to Google Drive

Copy scan folder(s) into [Scan Data folder](https://drive.google.com/drive/folders/1wyTsS5DBZY5rIp-hdVnlPX3P_PBWZHD6) within Drive

## 4. Copy data into Airtable

- Import results of condense operation into a Google Sheet
- Delete two columns, "URL" and "Scan Status"
- Create new column between columns C and D, leave it blank (this is for the calculated "Is Latest Scan" column).
- Copy from row 2 through last row and all columns (last column should be AI)
- Paste into Airtable USWDS Performance table at the bottom of the sheet (note: make sure "Grid view" is selected on the left side of the screen in Airtable). Paste operation should start in the second column (Websites). If you receive a warning that cells will be overwritten, press cancel and turn of automatic sorting on the table. Otherwise, you will be prompted and asked if you want to Expand the Table, click yes.

## 5. Send Airtable Report to GEAR Team

- In Airtable, download a CSV of the Websites table, send to GEAR team.

## 6. Send Scan Export to GEAR Team

As a reference, corresponding GEAR documentation is in :lock: [GEAR Playbook](https://docs.google.com/document/d/1MDf8hLrqORjSP6os_quxnI8LOQieE6YCjOvOwT7_IrE/edit#heading=h.g67uifgozv5o).

### 6.1 Produce GEAR data export

`bin/run data condense -c gearScans -f {folder(s)}`

For example, if the scans were run over two days, you'd enter:

`bin/run data condense -c gearScans -f "20230402,20230403"`

- Open CSV file in text editor. Find/replace ".png" with ".webp"
- Send CSV file to GEAR team.

### 6.2 Backup Data in Drive

- Copy all website screenshots into [Google Drive](https://drive.google.com/drive/folders/1q1IEjeTKYLNt68eK-ZaLucgIG_zlmMe9) (keep file names as is)
- Navigate to folder containing scan outputs `edxcli/data/scans/{date}`.
- Create new temporary folder to hold copies of webpage screenshots `mkdir webpageScreenshots`
- Copy all webpage screenshots (ignoring search engine screenshots) into temporary directory.

  `find . -type f -name "*.gov*.png" -exec cp "{}" webpageScreenshots/ \;`

- Convert images

  `cd websiteScreenshots`

  `npx sharp-cli -f webp --input "*.png" -o .`

- Delete .png files contained in `websiteScreenshots`
- With all of the screenshots in a central location, upload them into the [GEAR Website Screenshot](https://drive.google.com/drive/folders/1xhjXsEB6iNcpqWumiHW2uPsf-nhSDd3E) folder in Drive.
- GEAR team will then upload them into the server.

<!-- Release Notes -->

# Release Notes

All scan contain a `scanVersion` attribute which ties back to the version number listed in package.json. Each time an update has been made to the logic of the scans, the version number gets bumped. Doing so allows all teams to see the criteria at the time of the scan. We expect to update the version regularly so as to provide the most complete and accurate picture of websites at GSA.

## 1.0.0

[Issue 769](https://github.com/GSA/EDX/issues/769)

- Reorganized scan outputs into a shared schema

```json
"reports": {
  "facetName1": {
    "data": [],
    "errors": [],
    "description": ""
  },
  "facetName2": {
    "data": [],
    "errors": [],
    "description": ""
  }
}
```

- Established class structure for scanFacets.
- Inclusion of debug.js and verbose messaging.
- Capture of scan presets and facets in each report
- Greater error handling throughout
- Upgrade dependencies

## 0.0.25

[Issue 757](https://github.com/GSA/EDX/issues/757) - Updated types for TTS Site Scanner api response changes

## 0.0.24

[Issue 568](https://github.com/GSA/EDX/issues/568) - added custom privacy policy flag for challenge.gov

## 0.0.23

[Issue 522](https://github.com/GSA/EDX/issues/522) & [Issue 659](https://github.com/GSA/EDX/issues/659) - updated "Contact" criteria to accept the term Feedback and also avoid instances where the term "contact" is included in a CSS class, HTML attribute, or non-user facing location.

## 0.0.22

[Issue 693](https://github.com/GSA/EDX/issues/693) - Retrieve screenshots of common web search engines when searching for the website name. Results are appended to the screenshots section of websiteReports. Additional screenshotType attribute has been added to denote search engine or webpage screenshots.

## 0.0.21

[Issue 662](https://github.com/GSA/EDX/issues/662) - Copied website metadata settings for reginfo.gov over to mobile.reginfo.gov

## 0.0.20

pbs-billing.gsa.gov has a public face via https://www.pbs-billing.gsa.gov/ROW/users/CheckIfUserExists.aspx, updating metadata to scan the public-page

## 0.0.19

sftool.gov has it's own privacy policy, added it to website-metadata

## 0.0.18

[Issue 556](https://github.com/GSA/EDX/issues/556) - Included new attribute for customFOIA policies. Specifically added to address sites managed by GSA for OMB OIRA (rocis.gov and reginfo.gov).

## 0.0.17

[Issue 573](https://github.com/GSA/EDX/issues/573) - added ability to pass Basic Auth credentials when running a scan

## 0.0.16

[Issue 562](https://github.com/GSA/EDX/issues/562) - updated DAP regex value to cover teams using an updated version of Universal Federated Analytics (GA4) or th legacy version.

## 0.0.15

Added `searchNotReq: true` for vltp.gsa.gov

## 0.0.14

Added `customPrivacyPolicy: true` for code.gov and vote.gov

## 0.0.13

Set "www" prefix for gsa.gov. Transitioned to using edxcli over scanner.

## 0.0.12

Added 'send us an email' to allowed list for "Contact Us" IT Performance Metric.

## 0.0.11

Added 'email' and 'get support' to allowed list for "Contact Us" IT Performance Metric.

## 0.0.10

Added capability to check for custom privacy policy links as well as identify sites who are on the customPrivacyPolicy allowed list.

## 0.0.9

Updated criteria used when looking for a Search box on a page.

## 0.0.8

Added logic to perform an initial check of a given site and report errors such as DNS not resolving. This information is fed into a new scanStatus attribute which captures any errors or success messages.

Added two new sites to websites-metadata; slc.gsa.gov and pbs-billing.gsa.gov.

Bug fix: Switched dap and search regex options to type of "other" so as not to be included in the more robust required links evaluation.

## 0.0.7

Added support for urls which point at Drupal node numbers and ultimately resolve to the correct page.

## 0.0.6

[Issue #210](https://github.com/gsa/edx/issues/210) - GSA Digital Council met on March 22, 2022 to discuss the Search requirement on websites. Initial criteria was agreed upon which says that sites with no more than two public facing pages or those listed as an Application in our Touchpoints inventory ((require login and/or registration before content/features can be accessed) should not have the Search requirement imposed.

As a result, a new websites-metadata.js file was created so as to denote which sites meet this criteria. Subsequent attributes were also added to aid the scanning scripts so as to skip over javascript alert() messages, avoid cookie driven popups, or navigate to urls when the root url does not automatically redirect.

## 0.0.5

[Issue #302](https://github.com/gsa/edx/issues/302) - Updated regex criteria for required links. Previous versions assumed that links would point at "https://www" urls when pointing at a url without www is ok too. Added new privacy policy link which redirects to the correct location.

## 0.0.4

[Issue #297](https://github.com/GSA/EDX/pull/297) - Updated criteria for Search IT Performance Metric so as to account for sites using an `aria-label` to denote a search box.

## 0.0.3

[Issue #298](https://github.com/GSA/EDX/pull/298) - Updated Required Links logic to evaluate links which may not have `href` attributes. This occurs in some [Single Page Applications (SPA])](https://developer.mozilla.org/en-US/docs/Glossary/SPA) where navigation takes place through onClick attributes. The new logic navigates clicks links and looks at the resulting destination to make an assessment.

## 0.0.2

[Issue #284](https://github.com/GSA/EDX/pull/284) - Updated logic which informs the IT Performance metric DAP attribute. Prior scans searched for "https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js" to be present on the loaded page. However, many sites self-host the DAP.js file. The Site Scanner team addressed this issue with their code and looks for data passing to Google Analytics (see [https://github.com/GSA/site-scanning-engine/blob/7eecbb740b3d875d16f8b91187477db7945beed6/libs/core-scanner/src/scans/dap.ts#L16](https://github.com/GSA/site-scanning-engine/blob/7eecbb740b3d875d16f8b91187477db7945beed6/libs/core-scanner/src/scans/dap.ts#L16)).

## 0.0.1

Initial version of scanner committed
