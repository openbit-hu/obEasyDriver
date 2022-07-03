class EDControl {
    id: number
    stepPin: number
    directionPin: number
    enablePin: number
    currentPosition: number
    maxPosition: number
    constructor(id:number, step:number, dir:number,enable:number){
        this.id=id
        this.stepPin=step
        this.directionPin=dir
        this.enablePin=enable
        this.currentPosition=0
        this.maxPosition=-1 
    }
}

//% color=#008060 weight=100 icon="\ue4bb" block="obEasyDriver"
namespace obEasyDriver {
    let controls: EDControl[] = []
    let minDt: number = 1000
    let res: number = 200
    let t0: number
    //% blockId="obEasyDriver_setup"
    //% block="Configure pins for $id motor"
    export function setup(id: number, stepPin:number, dirPin:number, enablePin:number) {
        if (controls == null){
            controls = []
            control.inBackground(function () {
                while (true) {
                }
            })
        }
        let motor=new EDControl(id,stepPin,dirPin,enablePin)
        controls.push(new EDControl(id, stepPin, dirPin, enablePin))
    }
}