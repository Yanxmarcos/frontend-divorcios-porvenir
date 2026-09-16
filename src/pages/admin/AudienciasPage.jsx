import { useState } from 'react'
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  RotateCcw,
  UserX,
  Video,
} from 'lucide-react'
import AdminHeader from '../../components/layout/AdminHeader.jsx'
import AdminSidebar from '../../components/layout/AdminSidebar.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Modal from '../../components/ui/Modal.jsx'

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1)
const leadingBlankDays = Array.from({ length: 4 }, (_, index) => `blank-${index}`)
const demoToday = 10
const lastLegalDay = demoToday + 15

const initialHearings = {
  12: [
    {
      id: 'AUD-1201',
      time: '10:00',
      names: 'Julia Castro y Pedro León',
      modality: 'Virtual',
      result: null,
    },
  ],
  15: [
    {
      id: 'AUD-1501',
      time: '09:00',
      names: 'Ana Torres y Luis Mendoza',
      modality: 'Presencial',
      result: null,
    },
    {
      id: 'AUD-1502',
      time: '14:00',
      names: 'Rosa Salazar y Marco Ruiz',
      modality: 'Virtual',
      result: null,
    },
  ],
  20: [
    {
      id: 'AUD-2001',
      time: '11:00',
      names: 'Lucía Campos y Raúl Peña',
      modality: 'Presencial',
      result: null,
    },
  ],
}

const resultVariants = {
  Ratificado: 'success',
  'Pendiente de reprogramación': 'warning',
  'Archivado por inasistencia': 'danger',
}

function AudienciasPage() {
  const [selectedDay, setSelectedDay] = useState(15)
  const [hearingsByDay, setHearingsByDay] = useState(initialHearings)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('08:00')
  const [selectedModality, setSelectedModality] = useState('Presencial')
  const [modalError, setModalError] = useState('')

  const selectedHearings = hearingsByDay[selectedDay] ?? []

  const closeModal = () => {
    setIsModalOpen(false)
    setModalError('')
  }

  const openModal = () => {
    setModalError('')
    setIsModalOpen(true)
  }

  const scheduleHearing = (event) => {
    event.preventDefault()
    const currentHearings = hearingsByDay[selectedDay] ?? []
    const timeIsTaken = currentHearings.some(
      (hearing) => hearing.time === selectedTime,
    )

    if (timeIsTaken) {
      setModalError('Ya existe una audiencia programada en este horario.')
      return
    }

    const newHearing = {
      id: `AUD-${selectedDay}-${selectedTime.replace(':', '')}`,
      time: selectedTime,
      names: 'Solicitantes por asignar',
      modality: selectedModality,
      result: null,
    }

    setHearingsByDay((currentSchedule) => ({
      ...currentSchedule,
      [selectedDay]: [...(currentSchedule[selectedDay] ?? []), newHearing].sort(
        (first, second) => first.time.localeCompare(second.time),
      ),
    }))
    closeModal()
  }

  const registerResult = (hearingId, result) => {
    setHearingsByDay((currentSchedule) => ({
      ...currentSchedule,
      [selectedDay]: (currentSchedule[selectedDay] ?? []).map((hearing) =>
        hearing.id === hearingId ? { ...hearing, result } : hearing,
      ),
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Audiencias" />

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                Audiencias de Ratificación
              </h2>
              <p className="mt-2 text-neutral-600">
                Deben programarse dentro de los 15 días posteriores al registro.
              </p>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                      Calendario
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold text-neutral-900">Mayo 2026</h3>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-primary">
                    <CalendarDays aria-hidden="true" className="h-6 w-6" />
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-7 gap-1.5 sm:gap-2">
                  {weekDays.map((weekDay) => (
                    <div
                      className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400 sm:text-xs"
                      key={weekDay}
                    >
                      {weekDay}
                    </div>
                  ))}

                  {leadingBlankDays.map((blankDay) => (
                    <span aria-hidden="true" key={blankDay} />
                  ))}

                  {calendarDays.map((day) => {
                    const isPast = day < demoToday
                    const isOutOfRange = day > lastLegalDay
                    const isDisabled = isPast || isOutOfRange
                    const isSelected = day === selectedDay
                    const hasHearings = (hearingsByDay[day]?.length ?? 0) > 0

                    return (
                      <button
                        aria-label={`${day} de mayo de 2026${hasHearings ? ', con audiencias' : ''}`}
                        aria-pressed={isSelected}
                        className={`relative aspect-square min-h-10 rounded-xl text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-primary-light sm:min-h-12 ${
                          isSelected
                            ? 'bg-primary text-white shadow-md shadow-primary/25'
                            : isDisabled
                              ? 'cursor-not-allowed bg-neutral-50 text-neutral-300'
                              : 'bg-white text-neutral-800 ring-1 ring-inset ring-neutral-200 hover:bg-primary-light hover:text-primary hover:ring-primary-light'
                        }`}
                        disabled={isDisabled}
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        title={
                          isOutOfRange
                            ? 'Fuera de plazo legal'
                            : isPast
                              ? 'Fecha pasada'
                              : undefined
                        }
                        type="button"
                      >
                        {day}
                        {hasHearings && !isSelected && (
                          <span className="absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-neutral-200 pt-5 text-xs font-semibold text-neutral-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-primary" /> Seleccionado
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-neutral-200" /> No disponible
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Con audiencia
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-accent-light p-4 text-sm leading-6 text-amber-900">
                  <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p>
                    Fecha de demostración: <strong>10 de mayo de 2026</strong>. Los
                    días posteriores al 25 están fuera del plazo legal.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                      Agenda seleccionada
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold text-neutral-900">
                      {selectedDay} de mayo
                    </h3>
                  </div>
                  {selectedHearings.length > 0 && (
                    <button
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-light"
                      onClick={openModal}
                      type="button"
                    >
                      <Plus aria-hidden="true" className="h-4 w-4" />
                      Programar otra
                    </button>
                  )}
                </div>

                {selectedHearings.length === 0 ? (
                  <div className="grid min-h-96 place-items-center py-10 text-center">
                    <div>
                      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-100 text-neutral-400">
                        <CalendarDays aria-hidden="true" className="h-8 w-8" />
                      </span>
                      <h4 className="mt-5 text-xl font-extrabold text-neutral-900">
                        No hay audiencias programadas
                      </h4>
                      <p className="mt-2 text-sm text-neutral-600">
                        Puede reservar un horario disponible para esta fecha.
                      </p>
                      <button
                        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                        onClick={openModal}
                        type="button"
                      >
                        <Plus aria-hidden="true" className="h-5 w-5" />
                        Programar nueva
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-5">
                    {selectedHearings.map((hearing) => {
                      const ModalityIcon = hearing.modality === 'Virtual' ? Video : Building2

                      return (
                        <article
                          className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:border-primary-light hover:shadow-sm"
                          key={hearing.id}
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-primary">
                                <Clock3 aria-hidden="true" className="h-5 w-5" />
                                <span className="font-heading text-2xl font-extrabold">
                                  {hearing.time}
                                </span>
                              </div>
                              <h4 className="mt-3 font-bold leading-6 text-neutral-900">
                                {hearing.names}
                              </h4>
                              <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600">
                                <ModalityIcon aria-hidden="true" className="h-4 w-4" />
                                {hearing.modality}
                              </p>
                            </div>
                            {hearing.result && (
                              <Badge variant={resultVariants[hearing.result]}>{hearing.result}</Badge>
                            )}
                          </div>

                          <div className="mt-5 grid gap-2 border-t border-neutral-200 pt-4 sm:grid-cols-3">
                            <button
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-green-100 px-3 py-2 text-xs font-bold text-leaf transition hover:bg-green-200"
                              onClick={() => registerResult(hearing.id, 'Ratificado')}
                              type="button"
                            >
                              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                              Ratificado
                            </button>
                            <button
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-accent-light px-3 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-200"
                              onClick={() =>
                                registerResult(hearing.id, 'Pendiente de reprogramación')
                              }
                              type="button"
                            >
                              <RotateCcw aria-hidden="true" className="h-4 w-4" />
                              Reprogramar
                            </button>
                            <button
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-primary-light px-3 py-2 text-xs font-bold text-primary-dark transition hover:bg-red-200"
                              onClick={() =>
                                registerResult(hearing.id, 'Archivado por inasistencia')
                              }
                              type="button"
                            >
                              <UserX aria-hidden="true" className="h-4 w-4" />
                              Archivar por inasistencia
                            </button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Programar audiencia">
        <form onSubmit={scheduleHearing}>
          <div className="rounded-xl bg-primary-light/60 p-4">
            <p className="text-sm font-semibold text-primary-dark">Fecha seleccionada</p>
            <p className="mt-1 font-heading text-lg font-extrabold text-primary">
              {selectedDay} de mayo de 2026
            </p>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="hearing-time">
              Hora
            </label>
            <select
              className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-light"
              id="hearing-time"
              onChange={(event) => {
                setSelectedTime(event.target.value)
                setModalError('')
              }}
              value={selectedTime}
            >
              {['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00'].map(
                (time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="hearing-modality">
              Modalidad
            </label>
            <select
              className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-light"
              id="hearing-modality"
              onChange={(event) => setSelectedModality(event.target.value)}
              value={selectedModality}
            >
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          {modalError && (
            <p className="mt-4 rounded-xl bg-primary-light p-3 text-sm font-semibold text-primary-dark" role="alert">
              {modalError}
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="min-h-12 rounded-xl border border-neutral-200 px-5 py-3 font-bold text-neutral-600 transition hover:bg-neutral-50"
              onClick={closeModal}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
              type="submit"
            >
              <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
              Confirmar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AudienciasPage
