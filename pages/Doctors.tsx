import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Clock, X } from 'lucide-react';
import { MOCK_DOCTORS } from '../constants';
import { Doctor } from '../types';
import { toast } from 'react-hot-toast';

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const filteredDoctors = MOCK_DOCTORS.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setSelectedDoctor(null);
    setDate(''); setTime(''); setNote('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
        toast.error("Please select a date and time");
        return;
    }
    setTimeout(() => {
        toast.success(`Appointment booked with ${selectedDoctor?.name}!`);
        handleCloseModal();
    }, 800);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Professional Help</h1>
        <p style={{ color: 'var(--text-muted)' }}>Connect with certified mental health professionals nearby.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '2.5rem', marginBottom: 0, borderRadius: '2rem' }}
          placeholder="Search by name, specialty, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', position: 'relative' }}>
                 <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', padding: '0.25rem 0.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    <Star size={12} fill="#facc15" color="#facc15" style={{ marginRight: '0.25rem' }} /> {doc.rating}
                 </div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{doc.name}</h3>
                 <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.875rem', marginBottom: '1rem' }}>{doc.specialty}</p>
                 
                 <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><MapPin size={16} style={{ marginRight: '0.5rem' }} /> {doc.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><Clock size={16} style={{ marginRight: '0.5rem' }} /> {doc.experience}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><Calendar size={16} style={{ marginRight: '0.5rem' }} /> {doc.availability}</div>
                 </div>
                 
                 <button onClick={() => handleBookClick(doc)} className="btn" style={{ background: '#0f172a', color: 'white', marginTop: 'auto', width: '100%' }}>
                    Book Appointment
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>No professionals found.</div>
        )}
      </div>

      {isBookingOpen && selectedDoctor && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)' }} onClick={handleCloseModal}></div>
          <div className="card" style={{ position: 'relative', width: '100%', maxWidth: '500px', zIndex: 2010 }}>
              <button onClick={handleCloseModal} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8' }}><X size={24} /></button>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Book {selectedDoctor.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Fill out details to request a session.</p>
              
              <form onSubmit={handleConfirmBooking}>
                 <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Date</label>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input-field" style={{ marginBottom: 0 }} />
                 </div>
                 <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Time</label>
                    <select required value={time} onChange={(e) => setTime(e.target.value)} className="input-field" style={{ marginBottom: 0 }}>
                       <option value="">Select time</option>
                       <option value="09:00 AM">09:00 AM</option>
                       <option value="02:00 PM">02:00 PM</option>
                    </select>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} className="input-field" rows={3} style={{ marginBottom: 0 }} />
                 </div>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                    <button type="button" onClick={handleCloseModal} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                 </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;