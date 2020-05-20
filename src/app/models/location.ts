export class Location {
    city: string;
    state: string;

    constructor(it?: any) {
        this.city = it.city ? it.city.trim(): '';
        this.state = it.state? it.state.trim(): '';
    }
}
