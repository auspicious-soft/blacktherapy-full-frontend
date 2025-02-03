import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { generateSignedUrlForPaymentInvoice } from '@/actions';
import btnLogo from '@/assets/images/btn-logo.png';
// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    header1: {
        marginBottom: 20,
        padding: 10,
        borderBottom: 1,
        borderColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: 20,
        padding: 10,
        borderBottom: 1,
        borderColor: '#333333',
    },
    title: {
        fontSize: 20, // Reduced font size
        marginBottom: 10,
        color: '#333333'
    },
    section: {
        margin: 10,
        padding: 10
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    label: {
        width: 150,
        fontWeight: 'bold',
        color: '#555555',
        fontSize: 10 // Reduced font size
    },
    value: {
        flex: 1,
        color: '#333333',
        fontSize: 10 // Reduced font size
    },
    logo: {
        width: '100%', // Adjust as needed
        height: 'auto', // Adjust as needed
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#666666',
        borderTop: 1,
        borderColor: '#333333',
        paddingTop: 10,
        fontSize: 10 // Reduced font size
    }
});

// PDF Document Component
const PaymentInvoice = ({ appointment }: any) => {
    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header1}>
                    <Image style={styles.logo} src={btnLogo.src} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>Payment Request Invoice</Text>
                    <Text>Invoice Date: {formatDate(new Date())}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Client Information</Text> {/* Reduced font size */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Client Name:</Text>
                        <Text style={styles.value}>{appointment.clientName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{appointment.clientId.email}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Therapist Information</Text> {/* Reduced font size */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Therapist Name:</Text>
                        <Text style={styles.value}>{appointment.therapistName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{appointment.therapistEmail}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Service Details</Text> {/* Reduced font size */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Service Date:</Text>
                        <Text style={styles.value}>{formatDate(appointment.appointmentDate)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Service Time:</Text>
                        <Text style={styles.value}>{appointment.appointmentTime}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>{appointment.duration} hours</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Service Type:</Text>
                        <Text style={styles.value}>{appointment.servicesProvided}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Request Type:</Text>
                        <Text style={styles.value}>{appointment.requestType}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Progress Notes</Text> {/* Reduced font size */}
                    <Text style={{ fontSize: 10 }}>{appointment.progressNotes}</Text> {/* Reduced font size */}
                </View>

                <View style={styles.footer}>
                    <Text>This is an automatically generated invoice for payment request purposes.</Text>
                </View>
            </Page>
        </Document>
    )
}

// Function to upload PDF to S3
export const uploadPaymentInvoiceOnAppointment = async (appointment: any) => {
    try {
        const invoiceDoc = <PaymentInvoice appointment={appointment} />;
        const pdfBlob = await pdf(invoiceDoc).toBlob();
        const fileName = `invoice-${appointment._id}-${new Date().getTime()}.pdf`;

        // Get signed URL
        const { signedUrl, key } = await generateSignedUrlForPaymentInvoice(fileName, 'application/pdf', appointment.therapistEmail);

        await fetch(signedUrl, {
            method: 'PUT',
            body: pdfBlob,
            headers: {
                'Content-Type': 'application/pdf'
            }
        })
        return { key, signedUrl }

    } catch (error) {
        console.error('Error generating and uploading PDF:', error);
        throw error;
    }
};