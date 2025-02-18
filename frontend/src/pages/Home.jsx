import { useState, useNevigation } from "react";


function Home() {
    const nevigation = useNevigation();
    const list = ["b", "d", "f"];
    const [series, setSeries] = useState();

    return (
        <div>
            <ul>
                {
                    list.map(() =>
                        <li onClick={() => nevigation("/series")}></li>
                    )
                }
            </ul>
        </div>
    )
}

export default Home