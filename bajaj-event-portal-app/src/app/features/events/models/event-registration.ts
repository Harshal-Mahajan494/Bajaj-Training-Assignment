import { FormGroup, Validators, FormBuilder } from "@angular/forms";

export class EventRegistration {
    eventForm: FormGroup;

    constructor(private fb: FormBuilder) {
        // Using FormBuilder to create the form
        this.eventForm = this.fb.group({
            eventId: [0, Validators.required],
            eventCode: ['NOCODE', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            eventName: ['No Name', Validators.required],
            description: [''],
            startDate: [''],
            endDate: [''],
            fees: [0, [Validators.min(0)]],
            seatsFilled: [0, [Validators.min(0), Validators.max(100)]],
        });
    }
}


// import { FormGroup, FormControl, Validators } from "@angular/forms";

// export class EventRegistration {
//     eventForm: FormGroup = new FormGroup({
//             eventId: new FormControl(0, Validators.required),
//             eventCode: new FormControl('NOCODE', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
//             eventName: new FormControl('No Name', Validators.required),
//             description: new FormControl(),
//             startDate: new FormControl(),
//             endDate: new FormControl(),
//             fees: new FormControl(0, [Validators.min(0)]),
//             seatsFilled: new FormControl(0, [Validators.min(0), Validators.max(100)]),
//         });
// }
