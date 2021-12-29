const dateConverter = (idate) => {
    const firstly = idate.split("Z");
    const secondly = firstly[0].split("T");
    const date = secondly[0];
    const time1 = secondly[1].split('.');
    const time = time1[0];

    return [date, time];
};

export default dateConverter;