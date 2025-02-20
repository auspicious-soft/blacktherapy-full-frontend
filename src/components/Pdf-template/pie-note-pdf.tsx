/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { customFileUrlSigner } from '@/actions';
import btnLogo from '@/assets/images/btn-logo.png';
import pdfTopRIghtAsset from '@/assets/images/pdf-right.png';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        position: "relative"
    },
    headerContainer: {
        marginBottom: 30,
    },
    topRightDesign: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 100,
    },
    logo: {
        width: 300,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#1F2937'
    },
    documentDate: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 10,
        borderBottom: '2px solid #E5E7EB',
        paddingBottom: 10
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: '1px solid #E5E7EB'
    },
    label: {
        width: 120,
        fontSize: 12,
        color: '#4B5563',
        fontWeight: 'bold'
    },
    value: {
        flex: 1,
        fontSize: 12,
        color: '#1F2937'
    },
    pieSection: {
        marginTop: 20,
    },
    pieLabel: {
        fontSize: 16,
        fontWeight: 'extrabold',
        color: '#374151',
        marginBottom: 6
    },
    pieContentContainer: {
        padding: 10,
        backgroundColor: '#F1F4FF',
        borderRadius: 8,
        marginTop: 4
    },
    pieContent: {
        fontSize: 12,
        color: '#4B5563',
        lineHeight: 1.4
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 10,
        borderTop: '1px solid #E5E7EB',
        paddingTop: 10
    },
});

const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// PDF Document Component for Pie Note
const PieNotePdf = ({ appointment }: any) => {
    const therapistSignatures = appointment.signature || '';
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.topRightDesign} src={pdfTopRIghtAsset.src} />
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src={btnLogo.src} />
                    <Text style={styles.title}>Pie Note</Text>
                    <Text style={styles.documentDate}>
                        Document Date: {formatDate(new Date())}
                    </Text>
                </View>

                {/* Client Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Client Name & DOB:</Text>
                            <Text style={styles.value}>
                                {appointment.clientName} ({new Date(appointment.clientDob).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric'
                                })})
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{appointment.clientId.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Appointment Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appointment Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Diagnoses:</Text>
                            <Text style={styles.value}>{appointment.diagnoses}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>CPT Code:</Text>
                            <Text style={styles.value}>{appointment.cptCode}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date of Service:</Text>
                            <Text style={styles.value}>
                                {new Date(appointment.dateOfService).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Pie Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pie Details</Text>

                    <View style={styles.pieSection}>
                        <Text style={styles.pieLabel}>Problem</Text>
                        <View style={styles.pieContentContainer}>
                            <Text style={styles.pieContent}>
                                {appointment.problem}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.pieSection}>
                        <Text style={styles.pieLabel}>Intervention</Text>
                        <View style={styles.pieContentContainer}>
                            <Text style={styles.pieContent}>
                                {appointment.intervention}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.pieSection}>
                        <Text style={styles.pieLabel}>Evaluation</Text>
                        <View style={styles.pieContentContainer}>
                            <Text style={styles.pieContent}>
                                {appointment.evaluation}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ ...styles.section, marginTop: 100 }}>
                    <Text style={styles.sectionTitle}>Therapist Signature</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Therapist Name:</Text>
                            <Text style={styles.value}>{appointment.providerName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Signature:</Text>
                            <Image style={{ width: 250, height: 60 }} src={therapistSignatures} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDate(new Date())}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>
                        Generated by Black Therapy Network - Normalizing Therapy in the Black Community
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const uploadPieNoteOnAppointment = async (appointment: any) => {
    try {
        if (!appointment._id || !appointment.clientId?.email) {
            throw new Error('Missing required fields: _id or client email');
        }
        const pieDoc = <PieNotePdf appointment={appointment} />;
        const pdfBlob = await pdf(pieDoc).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `soapnote-${appointment._id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        const fileName = `appointments/${appointment.clientId.email}/my-appointment-files/pienote-${appointment._id}-${new Date().getTime()}.pdf`;
        const { signedUrl, key } = await customFileUrlSigner(fileName);
        const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: pdfBlob,
            headers: {
                'Content-Type': 'application/pdf'
            }
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload Pie note');
        }

        return { uploadedKey: key, signedUrl };
    } catch (error) {
        console.error('Error generating and uploading Pie note PDF:', error);
        throw error;
    }
}

export default PieNotePdf;
