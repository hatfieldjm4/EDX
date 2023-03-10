import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { facetType, presetType, ScanHelper } from './scan';
import { ScreenshotType } from './screenshot';
import { ICuiBanner } from './cui-banner';
import { IMetadataTags } from './metadata-tags';
const { version: appVersion } = require('../../../package.json');
import * as Debug from 'debug';
const debug = Debug.default('edxcli:website-report');

/**
 * Represents all data elements in a websiteReport
 * @param domain a valid Node URL object for the site that is being scanned
 * @param sh a ScanHelper object
 * @returns WebsiteReportType
 */
export class WebsiteReport implements IWebsiteReport {
  scanDate: string;
  startTime: string;
  endTime: string;
  /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
  scanVersion: string;
  domain: string;
  url: string;
  scanStatus: string;
  scanErrors: string[];
  scanPreset: presetType;
  scanFacets: facetType[];
  reports: Record<facetType, facetReport>;
  constructor(domain: URL, sh: ScanHelper) {
    this.scanDate = sh.formattedDate;
    this.startTime = new Date().toISOString();
    this.endTime = '';
    /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
    this.scanVersion = appVersion ?? '';
    this.domain =
      domain.protocol === 'file:'
        ? domain.pathname.split('/')[domain.pathname.split('/').length - 1]
        : domain.hostname;
    this.url = domain.toString();
    this.scanStatus = '';
    this.scanErrors = [];
    this.scanPreset = sh.preset;
    this.scanFacets = sh.facets;
    this.reports = {} as Record<facetType, facetReport>;
  }

  addReport(facetReport: Partial<Record<facetType, facetReport>>): void {
    debug('%s', 'adding data to report');
    const facets: facetType[] = Object.keys(facetReport) as facetType[];
    try {
      for (const facet in facets) {
        if (Object.prototype.hasOwnProperty.call(facets, facet)) {
          const val: facetType = facets[facet];
          if (
            this.reports[val] === undefined &&
            facetReport[val] !== undefined
          ) {
            debug('first time this report is assigned');
            Object.assign(this.reports, facetReport);
          } else {
            debug('merging with pre-existing data');
            this.reports[val].data = [
              ...this.reports[val].data,
              ...(facetReport[val]?.data || []),
            ];
          }
        }
      }
    } catch (error) {
      console.error('error adding data to report', error);
    }
  }
}

export interface IWebsiteReport {
  scanDate: string;
  startTime: string;
  endTime: string;
  /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
  scanVersion: string;
  domain: string;
  url: string;
  scanStatus: string;
  scanErrors: string[];
  scanPreset: string;
  scanFacets: facetType[];
  reports: Record<facetType, facetReport>;
}

export type facetReport = {
  description: string;
  errors: string[];
  data: any;
};
/*
  screenCapture: ScreenshotReport;
  itPerformanceMetric: PerformanceMetricReport;
  cuiBanner: CuiBannerReport;
  metadataTags: MetadataTagsReport;
  uswdsComponents: UswdsComponentsReport;
  siteScanner: {
    description: string;
    error: string;
    data: SiteScannerRecord;
  };
  lighthouse: {
    description: string;
    error: string;
    desktopData: any;
    mobileData: any;
  };
};
*/

export type ScreenshotReport = {
  description: string;
  data: ScreenshotType[];
};

export type CuiBannerReport = {
  description: string;
  data: ICuiBanner[];
};

export type MetadataTagsReport = {
  description: string;
  data: IMetadataTags;
};
