import { useState } from "react";

function Home() {
    const list = ["b", "d", "f"];
    const [series, setSeries] = useState();
    return (
        <div>
            <ul>
                {
                    list.map(() =>
                        <li onClick={() => nevigation("/נךשךשלשל")}></li>
                    )
                }
            </ul>
        </div>
    )
}

export default Home