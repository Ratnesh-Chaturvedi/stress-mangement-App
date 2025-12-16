import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Clock, X, CheckCircle } from 'lucide-react';
import { MOCK_DOCTORS } from '../constants';
import { Doctor } from '../types';
import { toast } from 'react-hot-toast';

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Mock form state
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
    // Reset form
    setDate('');
    setTime('');
    setNote('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
        toast.error("Please select a date and time");
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        toast.success(`Appointment booked with ${selectedDoctor?.name}!`);
        handleCloseModal();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Professional Help</h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Connect with certified mental health professionals nearby. 
          You are not alone—expert guidance is just a click away.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow sm:text-sm shadow-sm"
          placeholder="Search by name, specialty, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                 <img src={doc.image} alt={doc.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" /> {doc.rating}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                    <p className="text-teal-600 font-medium text-sm mb-3">{doc.specialty}</p>
                    
                    <div className="space-y-2 text-sm text-slate-500 mb-6">
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-slate-400" /> {doc.location}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-slate-400" /> {doc.experience} experience
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" /> <span className="text-green-600 font-medium">{doc.availability}</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => handleBookClick(doc)}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                    Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
             No professionals found matching your search.
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-slate-900/75 transition-opacity" aria-hidden="true" onClick={handleCloseModal}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="absolute top-4 right-4">
                  <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-500">
                      <X className="w-6 h-6" />
                  </button>
              </div>
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Calendar className="h-6 w-6 text-teal-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                      Book Session with {selectedDoctor.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500 mb-4">
                        Fill out the details below to request an appointment. The doctor's office will confirm shortly.
                      </p>
                      
                      <form id="bookingForm" onSubmit={handleConfirmBooking} className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                              <input 
                                type="date" 
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
                              <select 
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                              >
                                  <option value="">Select a time</option>
                                  <option value="09:00 AM">09:00 AM</option>
                                  <option value="11:00 AM">11:00 AM</option>
                                  <option value="02:00 PM">02:00 PM</option>
                                  <option value="04:00 PM">04:00 PM</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Short Note (Optional)</label>
                              <textarea 
                                rows={3}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Briefly describe your concern..."
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                              ></textarea>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  form="bookingForm"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm Request
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;