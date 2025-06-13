import BusyIndicator from "sap/m/BusyIndicator";
import Button from "sap/m/Button";
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
        growFactor?: number | PropertyBindingInfo | `{${string}}`;
        _busyIndicator?: BusyIndicator;
        _expand?: Button;
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

        // property: growFactor
        getGrowFactor(): number;
        setGrowFactor(growFactor: number): this;

        // aggregation: _busyIndicator
        get_busyIndicator(): BusyIndicator;
        set_busyIndicator(_busyIndicator: BusyIndicator): this;
        destroy_busyIndicator(): this;

        // aggregation: _expand
        get_expand(): Button;
        set_expand(_expand: Button): this;
        destroy_expand(): this;
    }
}
