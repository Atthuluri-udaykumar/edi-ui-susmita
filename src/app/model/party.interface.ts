export interface Party {
    partyId: number;
    optInDate?: string| Date;
    optOutDate?: string| Date;
    name?: string;
    rreId?: number;
    tin?: number;
    siteId?: number;
    goPaperlessReqBy?: string;
    reqPartyId?: number;
    reqRreId?: number;
    reqTin?: number;
    reqSiteId?: number;
}

export interface PartySrvcResponse {
    data?: Party[];
    totalRecords?: number;
}
