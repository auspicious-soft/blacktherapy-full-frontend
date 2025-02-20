import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        position: "relative"
    },
    headerContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#1F2937'
    },
    documentDate: {
        fontSize: 12,
        color: '#4B5563',
        marginBottom: 10
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 10,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 5
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    row: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingBottom: 4,
    },
    label: {
        width: 200,
        fontSize: 12,
        color: '#4B5563'
    },
    value: {
        flex: 1,
        fontSize: 12,
        color: '#1F2937'
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 20
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    checkbox: {
        width: 12,
        height: 12,
        border: '1px solid #4B5563',
        marginRight: 5
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
    }
});

const formatDate = (date:any) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const BiopsychosocialPDF = ({ assessment }:any) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Biopsychosocial Assessment</Text>
                    <Text style={styles.documentDate}>
                        Assessment Date: {formatDate(assessment.assessmentDate)}
                    </Text>
                </View>

                {/* Basic Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Client Name:</Text>
                            <Text style={styles.value}>{assessment.clientName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Assessment Start Time:</Text>
                            <Text style={styles.value}>{assessment.startTime}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Clinician Name:</Text>
                            <Text style={styles.value}>{assessment.clinicianName}</Text>
                        </View>
                    </View>
                </View>

                {/* Safety Assessment */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Safety Assessment</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Wished you were dead in past few weeks?</Text>
                            <View style={styles.radioGroup}>
                                <View style={styles.radioOption}>
                                    <View style={styles.checkbox} />
                                    <Text>Yes</Text>
                                </View>
                                <View style={styles.radioOption}>
                                    <View style={styles.checkbox} />
                                    <Text>No</Text>
                                </View>
                            </View>
                        </View>
                        {/* Add other safety assessment questions similarly */}
                    </View>
                </View>

                {/* Current Concerns */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Concerns</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.value}>{assessment.currentConcerns}</Text>
                        </View>
                    </View>
                </View>

                {/* Medical History */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medical History</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Current Medical Conditions:</Text>
                            <Text style={styles.value}>{assessment.medicalConditions}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Medications:</Text>
                            <Text style={styles.value}>{assessment.medications}</Text>
                        </View>
                    </View>
                </View>

                {/* Psychosocial */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Psychosocial Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Current Living Condition:</Text>
                            <Text style={styles.value}>{assessment.livingCondition}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Support Systems:</Text>
                            <Text style={styles.value}>{assessment.supportSystems}</Text>
                        </View>
                    </View>
                </View>

                {/* Strengths */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Strengths</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.value}>{assessment.strengths}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Confidential Biopsychosocial Assessment Document</Text>
                </View>
            </Page>
        </Document>
    );
};

export const generateBiopsychosocialPDF = async (assessment: any) => {
    try {
        if (!assessment) {
            throw new Error('Missing assessment data');
        }

        const assessmentDoc = <BiopsychosocialPDF assessment={assessment} />;
        const pdfBlob = await pdf(assessmentDoc).toBlob();

        // Generate download
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `biopsychosocial-assessment-${new Date().getTime()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return pdfBlob;
    } catch (error) {
        console.error('Error generating Biopsychosocial PDF:', error);
        throw error;
    }
};

export default BiopsychosocialPDF;