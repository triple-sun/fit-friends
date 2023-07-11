import { getSize } from "../utils/common.util";

export const Size = {
 Name: getSize(15, 1),
 Password: getSize(12, 6),
 Desc: getSize(140, 10),
 ReviewText: getSize(1024, 20),
 Kcal: getSize(5000, 1000),
 Rating: getSize(5, 1),
 Count: getSize(50, 1),
 Port: getSize(65535, 0),
 Merits: getSize(140, 10),
 Price: getSize(100000, 0),
}
