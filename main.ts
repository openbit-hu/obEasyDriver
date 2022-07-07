class EDControl {
    id: number
    stepPin: number
    directionPin: number
    enablePin: number
    currentStep: number
    maxSteps: number
    direction: number
    constructor(id:number, step:number, dir:number,enable:number){
        this.id=id
        this.stepPin=step
        this.directionPin=dir
        this.enablePin=enable
        this.currentStep=0
        this.maxSteps=-1 
        this.direction=0
    }
}

//% color=#008060 weight=100 icon="\uf013" block="obEasyDriver"
namespace obEasyDriver {
    let controls: EDControl[] = []
    let res: number = 20
    let isRunning = false
    //% blockId="obEasyDriver_setup"
    //% block="Configure pins for $id motor"
    export function setup(id: number, stepPin:number, dirPin:number, enablePin:number) {
        if (controls == null) {
            controls = []
            control.inBackground(function () {
                while (true) {
                    for (let i = 0; i < controls.length; i++) {
                        let motor = controls[i]
                        if (motor.direction != 0) {
                            pins.digitalWritePin(motor.enablePin, 0)
                        }
                    }
                    let anyIsRunning=false
                    for (let i = 0; i < controls.length; i++) {
                        let motor = controls[i]
                        if (motor.direction != 0) {
                            anyIsRunning=true
                            pins.digitalWritePin(motor.directionPin, (motor.direction < 0) ? 0 : 1)
                            pins.digitalWritePin(motor.stepPin, 1)
                        }
                    }
                    isRunning = anyIsRunning
                    if(anyIsRunning){
                        control.waitMicros(res)
                        for (let i = 0; i < controls.length; i++) {
                            let motor = controls[i]
                            if (motor.direction != 0) {
                                pins.digitalWritePin(motor.stepPin, 0)
                                motor.currentStep++
                                if (motor.currentStep == motor.maxSteps) {
                                    motor.direction = 0
                                    pins.digitalWritePin(motor.enablePin, 1)
                                }
                            }
                        }
                        control.waitMicros(res)
                    }
                }
            })
        }
        let motor=new EDControl(id,stepPin,dirPin,enablePin)
        controls.push(new EDControl(id, stepPin, dirPin, enablePin))
    }
    //% blockId="obEasyDriver_setup"
    //% block="Configure pins for $id motor"
    export function run(id: number, steps: number, direction: number, waitCompletion:boolean) {
        while(isRunning)basic.pause(10)
        for (let i = 0; i < controls.length; i++) {
            let motor = controls[i]
            if(motor.id==id){
                motor.maxSteps = steps
                motor.currentStep = 0
                motor.direction = direction
            }
        }
        if(waitCompletion){
            while (isRunning) basic.pause(10)
        }
    }
}