
export const getRatingClr = (rating) => {
    let ratingClass;
    switch (true) {
        case rating >= 4:
            ratingClass = "success";
            break;
        case rating >= 3 && rating < 4:
            ratingClass = "warning";
            break;
        case rating < 3:
            ratingClass = "error";
            break;
        default:
            ratingClass = "";
    }
    return ratingClass;
};

