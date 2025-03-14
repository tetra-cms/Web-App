/**
 * Dynamically import the component of SVGo component by using path
 * @param { string } path - path where svg icon resides
 */
export const useSVGIcon = (path: string) => { return "svgo-" + path };