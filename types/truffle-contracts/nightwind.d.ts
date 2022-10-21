declare module 'nightwind/helper' {
    /**
 * To initialize nightwind, add the following script tag to the head element of your pages.
 *
 * ```
 * import nightwind from "nightwind/helper"
 *
 * export default function Layout() {
 *   return (
 *     <>
 *       <Head>
 *         <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
 *       </Head>
 *       // ...
 *     </>
 *   )
 * }
 * ```
 */
 export declare function init(): string;
 /**
  * Similarly, you can use the toggle function to switch between dark and light mode.
  * ```
  * import nightwind from "nightwind/helper"
  *
  * export default function Navbar() {
  *   return (
  *     // ...
  *     <button onClick={() => nightwind.toggle()}></button>
  *     // ...
  *   )
  * }
  * ```
  */
 export declare function toggle(): void;
 /**
  * You can use the enable function to specifically switch between dark and light mode.
  * ```
  * import nightwind from "nightwind/helper"
  *
  * export default function Navbar() {
  *   return (
  *     // ...
  *     <button onClick={() => nightwind.enable(true)}></button>
  *     // ...
  *   )
  * }
  * ```
  */

  export declare function toggle(): void;
 /**
  * You can use the enable function to specifically switch between dark and light mode.
  * ```
  * import nightwind from "nightwind/helper"
  *
  * export default function Navbar() {
  *   return (
  *     // ...
  *     <button onClick={() => nightwind.enable(true)}></button>
  *     // ...
  *   )
  * }
  * ```
  */


  export declare function beforeTransition(): void;
 /**
  * Nightwind also exports a beforeTransition function that you can 
  * leverage in case you prefer to build your own toogle functions. 
  * It prevents unwanted transitions as a side-effect of having nightwind 
  * class in the html tag.
  * ```
  * import nightwind from "nightwind/helper"
  *
  * export default function Navbar() {
  *  const toggle = () => {
  *  nightwind.beforeTransition()
  *  if (theme !== 'dark') {
  *    setTheme('dark')
  * } else {
  *    setTheme('light')
  * }
  * }
  */
 

 export declare function enable(dark: boolean): void;
 
}
