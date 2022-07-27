let SCALING_FACTOR = 1;
let DEFAULT_FILL = [
    "rgba(203, 91, 220, 1)"
];


function Event({cx, cy, color}) {
    const r1 = 10 * SCALING_FACTOR;
    const r2 = 5 * SCALING_FACTOR;
    const sw = 2 * SCALING_FACTOR;

    return (
        <g stroke={color}>
            <circle cx={cx} cy={cy} r={r1} strokeWidth={sw} fill="none" />
            <circle cx={cx} cy={cy} r={r2} strokeWidth={sw} fill={color} />
        </g>
    );
}

function NewBranch({x0, y0, r0, x1, x2, y2, r2, curviness, pathHoverHandler}) {
    if (false) {
        return <></>;
    } else {
        let p0 = {x: x0 + r0, y: y0};
        let p1 = {x: p0.x * (1 - curviness) + (p0.x + x1) / 2 * curviness, y: y0};
        let p2 = {x: (p0.x + x1) / 2, y: y0};
        let p3 = {x: p2.x, y: (y0 + y2) / 2};
        let p4 = {x: p2.x, y: y2};
        let p5 = {x: p2.x * curviness + x1 * (1-curviness), y: y2};
        let p6 = {x: x2 - r2, y: y2};
        return <path d={`M${p0.x} ${p0.y}H${p1.x}Q${p2.x} ${p2.y},${p3.x} ${p3.y}Q${p4.x} ${p4.y},${p5.x} ${p5.y}H${p6.x}`}
                     stroke="black"
                     strokeWidth="2"
                     fill="none"
                     onMouseOver={pathHoverHandler}/>
    }
}

export default function Timeline() {
    // let events = [
    //     {name: "HKT", start_time: new Date("2018-06-11"), end_time: new Date("2019-07-31")},
    //     {name: "CUHK MPhil", start_time: new Date("2019-08-01"), end_time: new Date("2021-06-30")},
    //     {name: "LORA Technologies", start_time: new Date("2021-07-05"), end_time: new Date("2022-06-05")},
    //     {name: "Research Assistant", start_time: new Date("2021-10-05"), end_time: new Date("2022-06-11")},
    //     {name: "HSBC", start_time: new Date("2022-06-13"), end_time: Date.now()}
    // ];
    return (
        <svg version="1.1"
                width="58ch" height="150"
                xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white" />
            <Event cx="20" cy="20" color={DEFAULT_FILL[0]}/>
            <Event cx="70" cy="20" color={DEFAULT_FILL[0]}/>
            <Event cx="160" cy="50" color={DEFAULT_FILL[0]}/>
            <Event cx="160" cy="80" color={DEFAULT_FILL[0]}/>
            <path d="M30 20H60" stroke="black" strokeWidth="2" fill="none"/>
            <NewBranch x0={20} y0={20} r0={10} x1={70} x2={160} y2={50} r2={10} curviness={.5} pathHoverHandler={e => console.log(e)}/>
            <NewBranch x0={20} y0={20} r0={10} x1={60} x2={160} y2={80} r2={10} curviness={.2} pathHoverHandler={e => console.log(e)}/>
        </svg>
   );
}

// let events = [
//     {name: "HKT", start_time: new Date("2018-06-11"), end_time: new Date("2019-07-31")},
//     {name: "CUHK MPhil", start_time: new Date("2019-08-01"), end_time: new Date("2021-06-30")},
//     {name: "LORA Technologies", start_time: new Date("2021-07-05"), end_time: new Date("2022-06-05")},
//     {name: "Research Assistant", start_time: new Date("2021-10-05"), end_time: new Date("2022-06-11")},
//     {name: "HSBC", start_time: new Date("2022-06-13"), end_time: Date.now()}
// ];


// function eventsToBranches(events) {
//     let events = events.sort(({start_time}) => start_time);
//     let endTimeStack = [];
//     let results = [];

//     let branchNum = 1;

//     for (let e of events) {
//         let {start_time, end_time} = e;
//         if (startTimeStack.length > 0) {
//             let latestEndTime = endTimeStack[endTimeStack.length - 1];
//             if (end_time > latestEndTime) {
//                 endTimeStack.pop();
//             }
//             endTimeStack.push(end_time);
//             let eventBranchNum = branchNum;
//             if (start_time > latestEndTime) {
//                 endTimeStack.push(end_time);
//             } else {
//                 eventBranchNum += 1;
//                 if (end_time > latestEndTime) {
//                     branchNum = eventBranchNum;
//                 }
//             }
//             console.log(`${e.name}: ${eventBranchNum}`);
//         } else {
//             endTimeStack.push(end_time)
//             console.log(`${e.name}: ${branchNum}`)
//         }
//     }
// }