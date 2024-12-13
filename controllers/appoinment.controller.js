const Appointment = require('../models/Appointment');
const mongoose = require("mongoose");
const moment = require("moment");
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
            userId
        } = req.body;

        console.log(req.body);


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
            userId: new mongoose.Types.ObjectId(userId),
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
            if (status != 'all') {
                query.status = status;
            }
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

const getGraphData = async (req, res) => {
    try {
        const [completedCount, pendingCount] = await Promise.all([
            Appointment.countDocuments({ status: 'completed' }),
            Appointment.countDocuments({ status: 'upcoming' })
        ]);

        res.json({
            success: true,
            completedCount, pendingCount
        });

    } catch (error) {
        console.error('Error fetching appointment status data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointment status data',
            error: error.message
        });
    }
};

const getDailySalesData = async (req, res, next) => {
    try {
        // Get the last 30 days
        const last30Days = [];
        for (let i = 0; i < 30; i++) {
            last30Days.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
        }

        const salesData = await Appointment.aggregate([
            {
                $match: {
                    date: { $in: last30Days }
                }
            },
            {
                $group: {
                    _id: "$date",
                    totalSales: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const formattedSales = last30Days.map(date => {
            const salesForDate = salesData.find(sale => sale._id === date);
            return salesForDate ? salesForDate.totalSales : 0;
        });

        res.json({
            success: true,
            data: formattedSales,
        });
    } catch (err) {
        console.error("Error fetching daily sales:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { bookAppointment, getAppointments, getGraphData, getDailySalesData };
