export class OrderState{
    static IN_PROGRESS = "6242a6c52597694c914ff9ea";
    static READY = "6242cddc2597694c914ff9f0";
    static RESERVED_BY_DELIVERY_MAN = "6242cdeb2597694c914ff9f1";
    static DELIVERED_AND_PAID = "6242a6cf2597694c914ff9eb";

    static map : any = {
        "6242a6c52597694c914ff9ea" : "En cours",
        "6242cddc2597694c914ff9f0" : "Prête à être livrée",
        "6242cdeb2597694c914ff9f1" : "Prise en charge par le livreur",
        "6242a6cf2597694c914ff9eb" : "Livrée et Payée"
    }
};