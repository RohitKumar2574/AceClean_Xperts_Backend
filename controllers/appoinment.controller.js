const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res, next) => {
    try {

        const {
            customerNameForCleaning,
            preferredDate,
            preferredTimeRange,
            cleaningType,
            packageName,
            packageDetails,
            packagePrice,
            hst,
            totalPrice,
        } = req.body;

        const existingAppointment = await Appointment.findOne({
            date: preferredDate,
            timeRange: preferredTimeRange,
        });

        if (existingAppointment) {
            return res
                .status(400)
                .json({ message: "Appointment slot already taken." });
        }

        const newAppointment = new Appointment({
            customerName: customerNameForCleaning,
            date: preferredDate,
            timeRange: preferredTimeRange,
            cleaningType,
            packageName,
            packageDetails,

            packagePrice,
            hst,
            totalPrice,
        });

        const savedAppointment = await newAppointment.save();
        return res.status(201).json({
            message: "Appointment successfully booked!",
            appointment: savedAppointment,
        });

    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

const getAppointments = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const skip = (pageNum - 1) * limitNum;

        let query = {};
        if (status) {
            query.status = status;
        }

        const [appointments, totalAppointments] = await Promise.all([
            Appointment.find(query)
                .skip(skip)
                .limit(limitNum),

            Appointment.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalAppointments / limitNum);

        res.json({
            success: true,
            data: appointments,
            pagination: {
                currentPage: pageNum,
                totalPages: totalPages,
                totalRecords: totalAppointments,
                perPage: limitNum,
            },
        });
    } catch (err) {
        console.error("Error fetching appointments:", err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }

}

module.exports = { bookAppointment, getAppointments };
