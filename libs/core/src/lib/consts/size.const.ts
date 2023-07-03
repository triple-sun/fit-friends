import { SizeProperty } from "../enums/property.enum";
import { getSize } from "../utils/common.util";

export const Size = {
 [SizeProperty.Name]: getSize(15, 1),
 [SizeProperty.Password]: getSize(12, 6),
 [SizeProperty.Desc]: getSize(140, 10),
 [SizeProperty.ReviewText]: getSize(1024, 20),
 [SizeProperty.KCal]: getSize(5000, 1000),
 [SizeProperty.Rating]: getSize(5, 1),
 [SizeProperty.Count]: getSize(50, 1),
 [SizeProperty.Port]: getSize(65535, 0),
 [SizeProperty.Merits]: getSize(140, 10),
 [SizeProperty.Price]: getSize(100000, 0),
}
