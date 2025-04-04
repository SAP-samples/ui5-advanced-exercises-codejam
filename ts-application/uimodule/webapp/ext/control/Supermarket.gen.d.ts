import BusyIndicator from "sap/m/BusyIndicator";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Supermarket" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $SupermarketSettings extends $ControlSettings {
        x?: number | PropertyBindingInfo | `{${string}}`;
        y?: number | PropertyBindingInfo | `{${string}}`;
        z?: number | PropertyBindingInfo | `{${string}}`;
        _busyIndicator?: BusyIndicator;
    }

    export default interface Supermarket {

        // property: x
        getX(): number;
        setX(x: number): this;

        // property: y
        getY(): number;
        setY(y: number): this;

        // property: z
        getZ(): number;
        setZ(z: number): this;

        // aggregation: _busyIndicator
        get_busyIndicator(): BusyIndicator;
        set_busyIndicator(_busyIndicator: BusyIndicator): this;
        destroy_busyIndicator(): this;
    }
}
