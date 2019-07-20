export interface IAction{ }

export interface IRealTimeAction extends IAction{
    realTimeId: string;
    isRelTime: boolean;
}